import { useEffect, useState } from 'react';
import GoalForm from './components/GoalForm';
import SkillGapCard from './components/SkillGapCard';
import RoadmapCard from './components/RoadmapCard';
import NewsSection from './components/NewsSection';
import { analyzeSkillGap, fetchNews, fetchRoadmap } from './api';
import type { HackerNewsStory, RoadmapResponse, SkillGapResponse } from './types';

const App = () => {
  const [targetRole, setTargetRole] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGapResponse | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const [news, setNews] = useState<HackerNewsStory[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [loadingNews, setLoadingNews] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoadingNews(true);
        setNewsError(null);
        const stories = await fetchNews();
        setNews(stories);
      } catch (error) {
        setNewsError(error instanceof Error ? error.message : 'Unable to fetch news');
      } finally {
        setLoadingNews(false);
      }
    };
    loadNews();
  }, []);

  const handleAnalyze = async () => {
    if (!targetRole.trim()) return;
    setLoadingAnalysis(true);
    setAnalysisError(null);
    try {
      const skillsArray = skillsInput
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
      const [gap, roadmapResponse] = await Promise.all([
        analyzeSkillGap({ targetRole, currentSkills: skillsArray }),
        fetchRoadmap({ targetRole })
      ]);
      setSkillGap(gap);
      setRoadmap(roadmapResponse);
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'Unable to complete analysis');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <main className="page">
      <header>
        <h1>CodeAtRandom Career Navigator</h1>
        <p className="tagline">
          Understand your skill gaps, follow a tailored roadmap, and stay updated with tech news.
        </p>
      </header>

      <GoalForm
        targetRole={targetRole}
        currentSkills={skillsInput}
        loading={loadingAnalysis}
        onTargetRoleChange={setTargetRole}
        onCurrentSkillsChange={setSkillsInput}
        onSubmit={handleAnalyze}
      />

      {analysisError && <p className="error">{analysisError}</p>}

      <section className="layout">
        <SkillGapCard data={skillGap} />
        <RoadmapCard data={roadmap} />
      </section>

      <NewsSection stories={news} loading={loadingNews} error={newsError} />
    </main>
  );
};

export default App;

