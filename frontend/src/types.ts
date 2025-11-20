export type SkillGapResponse = {
  targetRole: string;
  providedSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  suggestedLearningOrder: { step: number; skill: string }[];
};

export type RoadmapResponse = {
  targetRole: string;
  phases: { phase: string; focus: string }[];
};

export type HackerNewsStory = {
  id: number;
  title: string;
  url?: string;
  by: string;
  type: string;
  score: number;
  time: number;
};

