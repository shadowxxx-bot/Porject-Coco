export interface MockProfile {
  id: number;
  name: string;
  headline: string;
  location: string;
  compatibility: number;
  videoThumbnail: string;
  photo: string;
  matchingTraits: string[];
  industries: string[];
  stage: string;
  bio: string;
  pitch: string;
  skills: string[];
  yearsExperience: string;
  previousStartups: number;
  lookingFor: string[];
  personalityTraits: { label: string; value: number }[];
}

export const mockProfiles: MockProfile[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    headline: 'Ex-Google PM building in climate tech',
    location: 'San Francisco, CA',
    compatibility: 92,
    videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    matchingTraits: ['Visionary', 'Risk-taker', 'Tech'],
    industries: ['Climate', 'SaaS'],
    stage: 'Building MVP',
    bio: 'I spent 5 years at Google leading product for sustainability initiatives. Now building a carbon accounting platform for SMBs. Looking for a technical co-founder who shares my passion for climate impact.',
    pitch: 'Building CarbonLedger - a carbon accounting platform that makes it dead simple for small businesses to track, reduce, and offset their carbon footprint. The $50B compliance market is shifting to SMBs and nobody is serving them well.',
    skills: ['Product Strategy', 'Fundraising', 'Go-to-Market'],
    yearsExperience: '6-10',
    previousStartups: 1,
    lookingFor: ['Technical', 'Design'],
    personalityTraits: [
      { label: 'Openness', value: 85 },
      { label: 'Conscientiousness', value: 70 },
      { label: 'Extraversion', value: 75 },
      { label: 'Agreeableness', value: 80 },
      { label: 'Emotional Stability', value: 65 },
      { label: 'Decision-making', value: 78 },
      { label: 'Execution', value: 72 },
      { label: 'Structure', value: 60 },
      { label: 'Collaboration', value: 88 },
      { label: 'Risk', value: 82 },
      { label: 'Time Horizon', value: 90 },
    ],
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    headline: 'Serial founder, 2 exits, now in HealthTech',
    location: 'Austin, TX',
    compatibility: 88,
    videoThumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    matchingTraits: ['Executor', 'Fast-paced', 'Mission-driven'],
    industries: ['HealthTech', 'AI/ML'],
    stage: 'Launched',
    bio: 'Built and sold two B2B SaaS companies. Now tackling mental health accessibility with AI-powered therapy matching. Need a technical co-founder with ML experience.',
    pitch: 'MindMatch uses AI to pair patients with the right therapist based on treatment style, personality fit, and outcomes data. We already have 200 therapists on the platform and growing 30% MoM.',
    skills: ['Sales', 'Operations', 'Team Building'],
    yearsExperience: '10+',
    previousStartups: 3,
    lookingFor: ['Technical'],
    personalityTraits: [
      { label: 'Openness', value: 60 },
      { label: 'Conscientiousness', value: 90 },
      { label: 'Extraversion', value: 85 },
      { label: 'Agreeableness', value: 55 },
      { label: 'Emotional Stability', value: 88 },
      { label: 'Decision-making', value: 92 },
      { label: 'Execution', value: 95 },
      { label: 'Structure', value: 75 },
      { label: 'Collaboration', value: 65 },
      { label: 'Risk', value: 80 },
      { label: 'Time Horizon', value: 55 },
    ],
  },
  {
    id: 3,
    name: 'Priya Sharma',
    headline: 'Ex-Stripe engineer, fintech enthusiast',
    location: 'New York, NY',
    compatibility: 85,
    videoThumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    matchingTraits: ['Direct', 'Collaborative', 'Analytical'],
    industries: ['Fintech', 'SaaS'],
    stage: 'Just an idea',
    bio: '7 years as a senior engineer at Stripe. Want to democratize investing for Gen Z. Looking for a business-minded co-founder who gets product and growth.',
    pitch: 'Thinking about building a micro-investing app that gamifies financial literacy for 18-25 year olds. Stripe taught me payments infrastructure - now I want to make investing feel as easy as sending a Venmo.',
    skills: ['Full-stack', 'System Design', 'APIs'],
    yearsExperience: '6-10',
    previousStartups: 0,
    lookingFor: ['Business', 'Marketing'],
    personalityTraits: [
      { label: 'Openness', value: 70 },
      { label: 'Conscientiousness', value: 85 },
      { label: 'Extraversion', value: 50 },
      { label: 'Agreeableness', value: 75 },
      { label: 'Emotional Stability', value: 80 },
      { label: 'Decision-making', value: 65 },
      { label: 'Execution', value: 70 },
      { label: 'Structure', value: 90 },
      { label: 'Collaboration', value: 82 },
      { label: 'Risk', value: 45 },
      { label: 'Time Horizon', value: 72 },
    ],
  },
];
