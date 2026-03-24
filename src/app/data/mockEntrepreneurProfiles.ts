export interface EntrepreneurMockProfile {
  id: number;
  name: string;
  photo: string;
  location: string;
  compatibility: number;

  // Project info
  projectName: string;
  projectOneLiner: string;
  projectIndustry: string;
  projectStage: string;
  projectDescription: string;
  customerType: string;
  traction: string;

  // Founder info
  role: string;
  bio: string;
  skills: string[];
  skillsInTeam: string[];
  skillsMissing: string[];

  // What they're looking for
  lookingFor: string[];
  cofounderDescription: string;

  // Working style
  matchingTraits: string[];
  personalityTraits: { label: string; value: number }[];

  // Commitment
  ambition: string;
  hoursPerWeek: string;
  timeline: string;
  motivation: string;

  // Short-term goals
  shortTermGoals: string[];
}

export const mockEntrepreneurProfiles: EntrepreneurMockProfile[] = [
  {
    id: 101,
    name: 'Alex Moreau',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Lausanne',
    compatibility: 91,

    projectName: 'GreenMile',
    projectOneLiner: 'B2B platform to optimize last-mile delivery with electric vehicles for urban retailers.',
    projectIndustry: 'Logistics / CleanTech',
    projectStage: 'Building prototype',
    projectDescription: 'GreenMile is a SaaS platform that helps urban retailers switch to electric last-mile delivery. We aggregate demand from local shops, optimize routes with AI, and connect them with EV fleet operators. Our goal: cut delivery costs by 30% and emissions by 80%.',
    customerType: 'B2B — Urban retailers & e-commerce brands',
    traction: '12 pilot retailers in Paris, LOI from 2 logistics companies',

    role: 'CEO & Business Lead',
    bio: 'Ex-McKinsey consultant with 6 years in supply chain strategy. Passionate about sustainable logistics. Built and sold a small logistics consultancy before starting GreenMile.',
    skills: ['Business Strategy', 'Supply Chain', 'Fundraising', 'Sales'],
    skillsInTeam: ['Business Development', 'Operations', 'Industry Expertise'],
    skillsMissing: ['Full-stack Development', 'DevOps', 'Data Engineering'],

    lookingFor: ['Technical Co-founder', 'CTO'],
    cofounderDescription: 'Looking for a technical co-founder who can build our route optimization engine and shipper dashboard. Ideally someone with experience in logistics tech or marketplace platforms.',

    matchingTraits: ['Visionary', 'Structured', 'Bold'],
    personalityTraits: [
      { label: 'Decision-making', value: 82 },
      { label: 'Execution', value: 75 },
      { label: 'Structure', value: 88 },
      { label: 'Collaboration', value: 70 },
      { label: 'Risk Tolerance', value: 78 },
      { label: 'Long-term Vision', value: 85 },
    ],

    ambition: 'Scalable startup (VC path)',
    hoursPerWeek: '35h+ (full-time)',
    timeline: 'Launch MVP in 3 months',
    motivation: 'Climate change is the defining challenge of our generation. I believe logistics is one of the biggest levers we have — and nobody is solving last-mile for small retailers.',

    shortTermGoals: [
      'Ship MVP by June 2026',
      'Onboard 50 retailers in Paris',
      'Close pre-seed round (€500K)',
    ],
  },
  {
    id: 102,
    name: 'Lena Kim',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    location: 'Zurich',
    compatibility: 87,

    projectName: 'MindCircle',
    projectOneLiner: 'B2C app combining AI-guided journaling and peer support circles for university students.',
    projectIndustry: 'HealthTech / EdTech',
    projectStage: 'Validating problem',
    projectDescription: 'MindCircle helps university students manage stress and anxiety through AI-guided journaling prompts and anonymous peer support groups. We use NLP to detect early warning signs and connect students with campus resources when needed.',
    customerType: 'B2C — University students (18-25)',
    traction: 'Validated with 200+ student surveys, 3 university partnerships in discussion',

    role: 'CEO & Product Lead',
    bio: 'Psychology researcher turned entrepreneur. Spent 4 years studying student mental health at Humboldt University. Ran a peer counseling program serving 500+ students. Ready to scale impact through technology.',
    skills: ['UX Research', 'Psychology', 'Content Strategy', 'Community Building'],
    skillsInTeam: ['Product Vision', 'User Research', 'Domain Expertise'],
    skillsMissing: ['Mobile Development', 'AI/ML', 'UI Design'],

    lookingFor: ['Technical Co-founder', 'Mobile Developer'],
    cofounderDescription: 'Need a technical co-founder passionate about mental health who can build our React Native app and integrate NLP models. Previous experience with health data privacy (GDPR) is a huge plus.',

    matchingTraits: ['Empathetic', 'Action-oriented', 'Calculated'],
    personalityTraits: [
      { label: 'Decision-making', value: 65 },
      { label: 'Execution', value: 80 },
      { label: 'Structure', value: 72 },
      { label: 'Collaboration', value: 90 },
      { label: 'Risk Tolerance', value: 55 },
      { label: 'Long-term Vision', value: 68 },
    ],

    ambition: 'Profitable business (bootstrapped)',
    hoursPerWeek: '20-35h',
    timeline: 'Beta launch in 4 months',
    motivation: 'I watched too many friends struggle silently during university. Traditional therapy is expensive and stigmatized. I want to build the support system I wish I had — accessible, affordable, peer-driven.',

    shortTermGoals: [
      'Launch beta at 3 Berlin universities',
      'Reach 1,000 active users',
      'Apply to Techstars Berlin',
    ],
  },
  {
    id: 103,
    name: 'Omar Diallo',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    location: 'Genève',
    compatibility: 84,

    projectName: 'DiasFund',
    projectOneLiner: 'Marketplace connecting diaspora investors with vetted SMEs in Senegal and Ivory Coast.',
    projectIndustry: 'FinTech',
    projectStage: 'First customers',
    projectDescription: 'DiasFund lets African diaspora invest directly in vetted small businesses back home — with transparent reporting, local due diligence, and fractional investment starting at £50. We handle compliance, currency exchange, and impact tracking.',
    customerType: 'B2C — African diaspora in Europe & North America',
    traction: '£45K invested through platform, 8 SMEs funded, 120 active investors',

    role: 'CEO & Product Lead',
    bio: 'Born in Senegal, raised in London. Former fintech engineer at Revolut for 5 years. Built DiasFund because sending money home to my uncle\'s business shouldn\'t require a flight and a handshake.',
    skills: ['Full-stack Dev', 'Fintech APIs', 'Mobile Development', 'Compliance'],
    skillsInTeam: ['Engineering', 'Product', 'Local Partnerships (Dakar)'],
    skillsMissing: ['Growth Marketing', 'Investor Relations', 'Legal/Compliance'],

    lookingFor: ['Business Co-founder', 'Head of Growth'],
    cofounderDescription: 'Looking for a business-minded co-founder who can drive growth, manage investor relations, and navigate UK/EU financial regulations. Diaspora community connections are a huge plus.',

    matchingTraits: ['Decisive', 'Independent', 'Mission-driven'],
    personalityTraits: [
      { label: 'Decision-making', value: 90 },
      { label: 'Execution', value: 85 },
      { label: 'Structure', value: 60 },
      { label: 'Collaboration', value: 55 },
      { label: 'Risk Tolerance', value: 88 },
      { label: 'Long-term Vision', value: 92 },
    ],

    ambition: 'Scalable startup (VC path)',
    hoursPerWeek: '35h+ (full-time)',
    timeline: 'Series A in 18 months',
    motivation: 'The African diaspora sends $90B home every year, but almost none of it goes to productive investments. I want to turn remittances into real economic impact — and give diaspora members a stake in Africa\'s growth story.',

    shortTermGoals: [
      'Expand to 3 new West African markets',
      'Reach £500K in total investments',
      'Close £1.2M seed round',
    ],
  },
  {
    id: 104,
    name: 'Sofia Ruiz',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Bâle',
    compatibility: 89,

    projectName: 'NomadDesk',
    projectOneLiner: 'Subscription platform matching remote workers with underused hotel workspaces during off-peak hours.',
    projectIndustry: 'PropTech / Future of Work',
    projectStage: 'Building prototype',
    projectDescription: 'NomadDesk partners with boutique hotels to convert empty lobbies, meeting rooms, and restaurants into bookable coworking spaces during low-occupancy hours. Remote workers get beautiful, quiet spaces. Hotels get new revenue from dead inventory.',
    customerType: 'B2B2C — Hotels & Remote workers',
    traction: '5 hotel partners signed in Barcelona, 200-person waitlist',

    role: 'CEO & Operations',
    bio: 'Former hotel operations manager at Marriott for 7 years. Saw firsthand how much beautiful space sits empty during weekdays. Left to build what I kept pitching internally — a platform to monetize idle hotel inventory for remote workers.',
    skills: ['Hospitality Operations', 'Partnership Dev', 'P&L Management', 'Sales'],
    skillsInTeam: ['Hotel Industry Network', 'Operations', 'Business Development'],
    skillsMissing: ['Web/Mobile Development', 'Booking System Architecture', 'Payment Integration'],

    lookingFor: ['Technical Co-founder'],
    cofounderDescription: 'Need a technical co-founder to build our booking platform — availability engine, payment processing, hotel dashboard. Experience with marketplace or booking platforms (Airbnb, OpenTable-style) would be perfect.',

    matchingTraits: ['Pragmatic', 'Networker', 'Resilient'],
    personalityTraits: [
      { label: 'Decision-making', value: 78 },
      { label: 'Execution', value: 88 },
      { label: 'Structure', value: 82 },
      { label: 'Collaboration', value: 85 },
      { label: 'Risk Tolerance', value: 65 },
      { label: 'Long-term Vision', value: 75 },
    ],

    ambition: 'Scalable startup (VC path)',
    hoursPerWeek: '35h+ (full-time)',
    timeline: 'Launch beta in 2 months',
    motivation: 'Remote work is here to stay but the infrastructure hasn\'t caught up. Coffee shops are noisy, coworking is expensive, and working from home is lonely. Hotels have the space — they just need a reason to open the doors.',

    shortTermGoals: [
      'Launch beta in Barcelona with 10 hotels',
      'Reach 500 monthly active bookings',
      'Expand to Lisbon and Madrid',
    ],
  },
  {
    id: 105,
    name: 'Yuki Tanaka',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    location: 'Lucerne',
    compatibility: 82,

    projectName: 'CraftBridge',
    projectOneLiner: 'D2C platform helping traditional Japanese artisans sell directly to global design enthusiasts.',
    projectIndustry: 'E-commerce / Cultural Tech',
    projectStage: 'First customers',
    projectDescription: 'CraftBridge connects Japanese craftspeople (ceramics, textiles, woodwork) directly with design-conscious buyers worldwide. We handle translation, international shipping, storytelling, and a curated marketplace experience — preserving traditions by making them commercially viable.',
    customerType: 'B2B2C — Japanese artisans & Global consumers',
    traction: '22 artisans onboarded, $18K GMV in first 3 months, 340 customers across 12 countries',

    role: 'CEO & Creative Director',
    bio: 'Design director with 8 years at MUJI. Grew up watching my grandfather\'s pottery workshop lose customers to mass production. Started CraftBridge to prove that traditional craft can thrive in the digital economy.',
    skills: ['Brand Design', 'Art Direction', 'Cultural Consulting', 'Storytelling'],
    skillsInTeam: ['Design', 'Artisan Relationships', 'Curation'],
    skillsMissing: ['E-commerce Engineering', 'International Logistics', 'Growth Marketing'],

    lookingFor: ['Technical Co-founder', 'Growth Lead'],
    cofounderDescription: 'Looking for a technical co-founder who can scale our marketplace — improve the buying experience, automate artisan onboarding, and build our logistics integrations. Bonus if you appreciate craft and design.',

    matchingTraits: ['Creative', 'Patient', 'Detail-oriented'],
    personalityTraits: [
      { label: 'Decision-making', value: 62 },
      { label: 'Execution', value: 70 },
      { label: 'Structure', value: 78 },
      { label: 'Collaboration', value: 88 },
      { label: 'Risk Tolerance', value: 50 },
      { label: 'Long-term Vision', value: 95 },
    ],

    ambition: 'Profitable business (bootstrapped)',
    hoursPerWeek: '35h+ (full-time)',
    timeline: 'Reach profitability in 12 months',
    motivation: 'Japan loses 2,000 traditional workshops every year. These aren\'t just businesses — they\'re centuries of cultural knowledge disappearing. I believe technology can reverse that trend by connecting artisans directly to the people who value their work.',

    shortTermGoals: [
      'Onboard 50 artisans across 5 craft categories',
      'Reach $50K monthly GMV',
      'Launch subscription box for recurring revenue',
    ],
  },
];
