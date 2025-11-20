export const ROLE_SKILLS = {
  FrontendDeveloper: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  'Backend Developer': ['Java', 'Spring Boot', 'SQL', 'APIs', 'Git'],
  'Data Analyst': ['Excel', 'SQL', 'Python', 'Dashboards', 'Statistics']
};

export const ROADMAPS = {
  'Backend Developer': [
    {
      phase: 'Phase 1 (1–2 months)',
      focus: 'Java basics, OOP fundamentals, Git and version control'
    },
    {
      phase: 'Phase 2 (2 months)',
      focus: 'Spring Boot, SQL schema design, building REST APIs'
    },
    {
      phase: 'Phase 3 (1–2 months)',
      focus: 'Deployment strategies, personal projects, system design basics'
    }
  ],
  FrontendDeveloper: [
    {
      phase: 'Phase 1 (1–2 months)',
      focus: 'HTML semantics, CSS layouts, JavaScript fundamentals'
    },
    {
      phase: 'Phase 2 (1–2 months)',
      focus: 'React components, state management, APIs integration'
    },
    {
      phase: 'Phase 3 (1 month)',
      focus: 'Testing, performance tuning, responsive portfolio projects'
    }
  ],
  'Data Analyst': [
    {
      phase: 'Phase 1 (1–2 months)',
      focus: 'Excel mastery, SQL querying, statistics refresher'
    },
    {
      phase: 'Phase 2 (1–2 months)',
      focus: 'Python for analysis, data cleaning, visualization libraries'
    },
    {
      phase: 'Phase 3 (1 month)',
      focus: 'Dashboards, storytelling with data, real datasets portfolio'
    }
  ]
};

export const DEFAULT_ROADMAP = [
  {
    phase: 'Phase 1',
    focus: 'Solidify fundamentals, fill immediate skill gaps'
  },
  {
    phase: 'Phase 2',
    focus: 'Build intermediate projects and seek feedback'
  },
  {
    phase: 'Phase 3',
    focus: 'Tackle advanced topics, interview prep, networking'
  }
];

