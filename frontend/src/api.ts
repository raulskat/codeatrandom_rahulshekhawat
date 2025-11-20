import type { RoadmapResponse, SkillGapResponse, HackerNewsStory } from './types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Unexpected API error');
  }
  return response.json();
};

export const analyzeSkillGap = async (payload: {
  targetRole: string;
  currentSkills: string[];
}): Promise<SkillGapResponse> => {
  const response = await fetch(`${API_BASE}/skill-gap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse<SkillGapResponse>(response);
};

export const fetchRoadmap = async (payload: {
  targetRole: string;
}): Promise<RoadmapResponse> => {
  const response = await fetch(`${API_BASE}/roadmap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse<RoadmapResponse>(response);
};

export const fetchNews = async (): Promise<HackerNewsStory[]> => {
  const response = await fetch(`${API_BASE}/news`);
  const data = await handleResponse<{ stories: HackerNewsStory[] }>(response);
  return data.stories;
};

