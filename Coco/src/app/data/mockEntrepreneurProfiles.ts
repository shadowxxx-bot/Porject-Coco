export interface EntrepreneurMockProfile {
  id: number;
  name: string;
  headline: string;
  location: string;
  compatibility: number;
  photo: string;
  projectOneLiner: string;
  projectIndustry: string;
  projectStage: string;
  lookingFor: string[];
  skills: string[];
  matchingTraits: string[];
  personalityTraits: { label: string; value: number }[];
  ambition: string;
  hoursPerWeek: string;
}

export const mockEntrepreneurProfiles: EntrepreneurMockProfile[] = [
  {
    id: 101,
    name: 'Alex Moreau',
    headline: 'Building the future of sustainable logistics',
    location: 'Paris, France',
    compatibility: 91,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    projectOneLiner: 'B2B platform to optimize last-mile delivery with electric vehicles for urban retailers.',
    projectIndustry: 'Logistics',
    projectStage: 'Building a prototype',
    lookingFor: ['Technical', 'Operations'],
    skills: ['Business Strategy', 'Supply Chain', 'Fundraising'],
    matchingTraits: ['Visionary', 'Structured', 'Bold'],
    personalityTraits: [
      { label: 'Decision-making', value: 82 },
      { label: 'Execution', value: 75 },
      { label: 'Structure', value: 88 },
      { label: 'Collaboration', value: 70 },
      { label: 'Risk', value: 78 },
      { label: 'Time Horizon', value: 85 },
    ],
    ambition: 'Scalable startup (VC path)',
    hoursPerWeek: '35h+ (full-time)',
  },
  {
    id: 102,
    name: 'Lena Kim',
    headline: 'Democratizing mental health for students',
    location: 'Berlin, Germany',
    compatibility: 87,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    projectOneLiner: 'B2C app combining AI-guided journaling and peer support circles for university students.',
    projectIndustry: 'Health',
    projectStage: 'Validating the problem',
    lookingFor: ['Technical', 'Design'],
    skills: ['UX Research', 'Psychology', 'Marketing'],
    matchingTraits: ['Action-oriented', 'Team player', 'Calculated'],
    personalityTraits: [
      { label: 'Decision-making', value: 65 },
      { label: 'Execution', value: 80 },
      { label: 'Structure', value: 72 },
      { label: 'Collaboration', value: 90 },
      { label: 'Risk', value: 55 },
      { label: 'Time Horizon', value: 68 },
    ],
    ambition: 'Profitable business (bootstrapped)',
    hoursPerWeek: '20-35h',
  },
  {
    id: 103,
    name: 'Omar Diallo',
    headline: 'Reinventing financial inclusion in West Africa',
    location: 'London, UK',
    compatibility: 84,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    projectOneLiner: 'Marketplace connecting diaspora investors with vetted SMEs in Senegal and Ivory Coast.',
    projectIndustry: 'Finance',
    projectStage: 'First customers',
    lookingFor: ['Business', 'Marketing'],
    skills: ['Full-stack Dev', 'Fintech APIs', 'Mobile Development'],
    matchingTraits: ['Decisive', 'Independent', 'Visionary'],
    personalityTraits: [
      { label: 'Decision-making', value: 90 },
      { label: 'Execution', value: 85 },
      { label: 'Structure', value: 60 },
      { label: 'Collaboration', value: 55 },
      { label: 'Risk', value: 88 },
      { label: 'Time Horizon', value: 92 },
    ],
    ambition: 'Scalable startup (VC path)',
    hoursPerWeek: '35h+ (full-time)',
  },
];
