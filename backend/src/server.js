import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROLE_SKILLS, ROADMAPS, DEFAULT_ROADMAP } from './constants.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const submissionsFile = path.join(__dirname, '../data/submissions.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const normalizeSkill = (skill = '') => skill.trim().toLowerCase();
const normalizeRoleKey = (value = '') => value.replace(/\s+/g, '').toLowerCase();
const resolveRoleKey = (role = '') => {
  const normalized = normalizeRoleKey(role);
  return Object.keys(ROLE_SKILLS).find((key) => normalizeRoleKey(key) === normalized);
};
const formatSkills = (skillsInput = []) => {
  if (!skillsInput) return [];
  if (Array.isArray(skillsInput)) {
    return skillsInput.map((skill) => normalizeSkill(skill)).filter(Boolean);
  }
  if (typeof skillsInput === 'string') {
    return skillsInput
      .split(',')
      .map((skill) => normalizeSkill(skill))
      .filter(Boolean);
  }
  return [];
};

const persistSubmission = async (record) => {
  try {
    const existingRaw = await fs.readFile(submissionsFile, 'utf-8').catch(() => '[]');
    const existing = JSON.parse(existingRaw);
    existing.push(record);
    await fs.writeFile(submissionsFile, JSON.stringify(existing, null, 2));
  } catch (error) {
    console.error('Unable to persist submission', error.message);
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/skill-gap', async (req, res) => {
  try {
    const { targetRole = '', currentSkills } = req.body;
    const normalizedRole = targetRole.trim();
    const roleKey = resolveRoleKey(normalizedRole);

    if (!normalizedRole) {
      return res.status(400).json({ message: 'targetRole is required' });
    }

    const requiredSkills = roleKey ? ROLE_SKILLS[roleKey] : undefined;
    if (!requiredSkills) {
      return res.status(404).json({
        message: `No reference skills configured for ${normalizedRole}. Try FrontendDeveloper, Backend Developer, or Data Analyst.`
      });
    }

    const providedSkills = formatSkills(currentSkills);
    const matchedSkills = requiredSkills.filter((skill) =>
      providedSkills.includes(skill.toLowerCase())
    );
    const missingSkills = requiredSkills.filter(
      (skill) => !providedSkills.includes(skill.toLowerCase())
    );

    const recommendations = missingSkills.map(
      (skill) => `Spend focused study time on ${skill} and add a small project to validate it.`
    );
    const suggestedLearningOrder = missingSkills.map((skill, index) => ({
      step: index + 1,
      skill
    }));

    const payload = {
      targetRole: roleKey,
      providedSkills,
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder
    };

    await persistSubmission({
      ...payload,
      createdAt: new Date().toISOString()
    });

    res.json(payload);
  } catch (error) {
    console.error('Skill gap error', error);
    res.status(500).json({ message: 'Unable to analyze skill gap' });
  }
});

app.post('/api/roadmap', (req, res) => {
  try {
    const { targetRole = '' } = req.body;
    const normalizedRole = targetRole.trim();
    const roleKey = resolveRoleKey(normalizedRole);
    if (!normalizedRole) {
      return res.status(400).json({ message: 'targetRole is required' });
    }

    const roadmap = (roleKey && ROADMAPS[roleKey]) || DEFAULT_ROADMAP;
    res.json({
      targetRole: roleKey || normalizedRole,
      phases: roadmap
    });
  } catch (error) {
    console.error('Roadmap error', error);
    res.status(500).json({ message: 'Unable to generate roadmap' });
  }
});

app.get('/api/news', async (_req, res) => {
  try {
    const idsResponse = await axios.get(
      'https://hacker-news.firebaseio.com/v0/newstories.json'
    );
    const ids = idsResponse.data?.slice(0, 5) || [];

    const stories = await Promise.all(
      ids.map(async (id) => {
        const { data } = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return {
          id: data.id,
          title: data.title,
          url: data.url,
          score: data.score,
          by: data.by,
          time: data.time,
          type: data.type
        };
      })
    );

    res.json({ stories });
  } catch (error) {
    console.error('News fetch error', error);
    res.status(502).json({ message: 'Unable to fetch HackerNews stories' });
  }
});

app.listen(PORT, () => {
  console.log(`API server ready on http://localhost:${PORT}`);
});

