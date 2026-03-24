export interface Match {
  id: number;
  name: string;
  photo: string;
  role: string;
  type: 'entrepreneur' | 'cofounder';
  // Entrepreneur-specific
  projectName?: string;
  projectIndustry?: string;
  projectSummary?: string;
  // Cofounder-specific
  skills?: string[];
  headline?: string;
  // Shared
  location: string;
  compatibility: number;
  matchReasons: string[];
  availability: string;
  matchedAt: string;
  status: 'new' | 'chatting' | 'scheduled';
  lastActivity?: string;
}

// Matches seen by a cofounder (entrepreneurs who liked them)
export const entrepreneurMatches: Match[] = [
  {
    id: 101,
    name: 'Alex Moreau',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    role: 'CEO & Business Lead',
    type: 'entrepreneur',
    projectName: 'GreenMile',
    projectIndustry: 'Logistics / CleanTech',
    projectSummary: 'B2B platform to optimize last-mile delivery with electric vehicles for urban retailers.',
    location: 'Lausanne',
    compatibility: 91,
    matchReasons: ['Needs your tech skills', 'Aligned work style', 'Both full-time committed'],
    availability: 'Full-time',
    matchedAt: '2h ago',
    status: 'new',
  },
  {
    id: 104,
    name: 'Sofia Ruiz',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    role: 'CEO & Operations',
    type: 'entrepreneur',
    projectName: 'NomadDesk',
    projectIndustry: 'PropTech / Future of Work',
    projectSummary: 'Subscription platform matching remote workers with underused hotel workspaces during off-peak hours.',
    location: 'Bâle',
    compatibility: 89,
    matchReasons: ['Complementary skills', 'Marketplace experience match', 'Strong executor'],
    availability: 'Full-time',
    matchedAt: '1d ago',
    status: 'chatting',
    lastActivity: '3h ago',
  },
  {
    id: 102,
    name: 'Lena Kim',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    role: 'CEO & Product Lead',
    type: 'entrepreneur',
    projectName: 'MindCircle',
    projectIndustry: 'HealthTech / EdTech',
    projectSummary: 'B2C app combining AI-guided journaling and peer support circles for university students.',
    location: 'Zurich',
    compatibility: 87,
    matchReasons: ['Needs mobile dev', 'Shared values', 'Research-driven approach'],
    availability: '20-35h/week',
    matchedAt: '3d ago',
    status: 'scheduled',
    lastActivity: 'Call scheduled for Mar 26',
  },
];

// Matches seen by an entrepreneur (cofounders who liked them)
export const cofounderMatches: Match[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    role: 'Technical Co-founder',
    type: 'cofounder',
    headline: 'Full-stack dev ready to join a climate tech startup',
    skills: ['React', 'Node.js', 'AWS', 'Python'],
    location: 'Lausanne',
    compatibility: 92,
    matchReasons: ['Strong tech background', 'Climate tech aligned', 'Full-time available'],
    availability: 'Full-time',
    matchedAt: '1h ago',
    status: 'new',
  },
  {
    id: 4,
    name: 'Noah Keller',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    role: 'Technical Co-founder',
    type: 'cofounder',
    headline: 'DevOps & backend engineer ready to build infrastructure for scale',
    skills: ['Go', 'Kubernetes', 'PostgreSQL', 'Terraform'],
    location: 'Berne',
    compatibility: 86,
    matchReasons: ['Backend expertise', 'Startup experience', 'Scalability-focused'],
    availability: 'Full-time',
    matchedAt: '5h ago',
    status: 'chatting',
    lastActivity: '1h ago',
  },
  {
    id: 5,
    name: 'Léa Dubois',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    role: 'Marketing Co-founder',
    type: 'cofounder',
    headline: 'Marketing & brand strategist looking for a tech co-founder',
    skills: ['Brand Strategy', 'Growth Marketing', 'Community Building'],
    location: 'Fribourg',
    compatibility: 83,
    matchReasons: ['Growth expertise', 'D2C experience', 'Community skills'],
    availability: '20-35h/week',
    matchedAt: '2d ago',
    status: 'new',
  },
];

export interface Conversation {
  id: number;
  matchId: number;
  name: string;
  photo: string;
  projectName: string;
  projectIndustry: string;
  compatibility: number;
  unread: number;
  messages: Message[];
}

export interface Message {
  id: number;
  senderId: 'me' | number;
  text: string;
  timestamp: string;
}

export const mockConversations: Conversation[] = [
  {
    id: 1,
    matchId: 101,
    name: 'Alex Moreau',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    projectName: 'GreenMile',
    projectIndustry: 'Logistics / CleanTech',
    compatibility: 91,
    unread: 2,
    messages: [
      { id: 1, senderId: 101, text: 'Hey! Really excited about our match. I checked out your profile — your backend experience is exactly what GreenMile needs.', timestamp: '2:34 PM' },
      { id: 2, senderId: 'me', text: 'Thanks Alex! Your project sounds fascinating. I\'ve actually been thinking about logistics optimization problems lately.', timestamp: '2:36 PM' },
      { id: 3, senderId: 101, text: 'That\'s great to hear! We\'re building the route optimization engine right now. Would love to walk you through the architecture we have in mind.', timestamp: '2:38 PM' },
      { id: 4, senderId: 101, text: 'Are you free for a call this week? I can share our deck and the technical roadmap.', timestamp: '2:38 PM' },
    ],
  },
  {
    id: 2,
    matchId: 104,
    name: 'Sofia Ruiz',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    projectName: 'NomadDesk',
    projectIndustry: 'PropTech / Future of Work',
    compatibility: 89,
    unread: 0,
    messages: [
      { id: 1, senderId: 104, text: 'Hi! Love that we matched. Your marketplace experience is exactly what I\'m looking for at NomadDesk.', timestamp: 'Yesterday 10:15 AM' },
      { id: 2, senderId: 'me', text: 'Hey Sofia! NomadDesk is such a clever idea. The hotel idle inventory angle is brilliant.', timestamp: 'Yesterday 10:22 AM' },
      { id: 3, senderId: 104, text: 'Thanks! We already have 5 boutique hotels signed up. The booking engine is where I need the most help.', timestamp: 'Yesterday 10:30 AM' },
      { id: 4, senderId: 'me', text: 'I\'ve built availability/booking systems before. Would love to learn more. When works for a call?', timestamp: 'Yesterday 11:05 AM' },
      { id: 5, senderId: 104, text: 'How about Thursday at 3pm CET? I can demo what we have so far.', timestamp: 'Yesterday 11:12 AM' },
      { id: 6, senderId: 'me', text: 'Perfect, Thursday 3pm works!', timestamp: 'Yesterday 11:15 AM' },
    ],
  },
  {
    id: 3,
    matchId: 102,
    name: 'Lena Kim',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    projectName: 'MindCircle',
    projectIndustry: 'HealthTech / EdTech',
    compatibility: 87,
    unread: 0,
    messages: [
      { id: 1, senderId: 102, text: 'Hi! Your mobile development experience caught my eye. MindCircle really needs someone who can build a polished React Native app.', timestamp: 'Mon 9:00 AM' },
      { id: 2, senderId: 'me', text: 'Hey Lena! I love the mission behind MindCircle. Tell me more about the NLP component.', timestamp: 'Mon 9:45 AM' },
      { id: 3, senderId: 102, text: 'We want to use sentiment analysis on journal entries to detect early signs of distress and proactively suggest resources.', timestamp: 'Mon 10:02 AM' },
      { id: 4, senderId: 'me', text: 'That\'s a thoughtful approach. GDPR compliance will be the tricky part.', timestamp: 'Mon 10:30 AM' },
      { id: 5, senderId: 102, text: 'Exactly! We\'re already talking to a data protection lawyer. Want to join our next call on Wednesday?', timestamp: 'Mon 10:45 AM' },
      { id: 6, senderId: 'me', text: 'Definitely, count me in.', timestamp: 'Mon 11:00 AM' },
    ],
  },
];
