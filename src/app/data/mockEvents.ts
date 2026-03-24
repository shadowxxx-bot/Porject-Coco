export interface EventData {
  id: number;
  title: string;
  type: 'in-person' | 'online';
  date: string;
  time: string;
  location: string;
  description: string;
  coverImage: string;
  attendeeCount: number;
  maxAttendees: number;
  hostName: string;
  hostPhoto: string;
  hostBio: string;
  tags: string[];
  whatToExpect: string[];
  isAttending: boolean;
  attendeePhotos: string[];
}

export const mockEvents: EventData[] = [
  {
    id: 1,
    title: 'Founder Speed Dating \u2014 Zurich',
    type: 'in-person',
    date: 'March 28, 2026',
    time: '18:30',
    location: 'Impact Hub Zurich',
    description: 'Meet 10+ ambitious founders in rapid-fire 1-on-1 conversations. Whether you have an idea or are looking to join one, this is the fastest way to find your co-founder match. Drinks and snacks included!',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
    attendeeCount: 24,
    maxAttendees: 30,
    hostName: 'Coco Match Team',
    hostPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop',
    hostBio: 'The Coco Match team organizes weekly founder meetups across Europe to help you find your perfect co-founder.',
    tags: ['Speed Dating', 'Networking'],
    whatToExpect: [
      '5-minute 1-on-1 conversations',
      'Meet 8-10 founders',
      'Drinks & snacks included',
      'Matchmaking follow-up after event',
    ],
    isAttending: false,
    attendeePhotos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'AI Startup Co-founder Mixer',
    type: 'online',
    date: 'March 30, 2026',
    time: '19:00',
    location: 'Zoom',
    description: 'A virtual mixer for founders building in AI/ML. Get matched into breakout rooms with 3-4 other founders, share your pitch, and discover potential co-founders building in the same space.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    attendeeCount: 56,
    maxAttendees: 80,
    hostName: 'Sarah Chen',
    hostPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    hostBio: 'Ex-Google PM building in climate tech. Passionate about connecting AI founders.',
    tags: ['Industry-specific', 'Networking'],
    whatToExpect: [
      'Breakout rooms with 3-4 founders',
      'Share your pitch in 2 minutes',
      'AI/ML focused discussions',
      'Find your technical match',
    ],
    isAttending: true,
    attendeePhotos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Climate Tech Founders Meetup',
    type: 'in-person',
    date: 'April 2, 2026',
    time: '17:00',
    location: 'Station F, Paris',
    description: 'Connect with founders tackling climate change. From carbon accounting to clean energy, meet people building solutions that matter. Keynote by a Y Combinator alumni on climate fundraising.',
    coverImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=450&fit=crop',
    attendeeCount: 38,
    maxAttendees: 50,
    hostName: 'Marcus Johnson',
    hostPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    hostBio: 'Serial founder with 2 exits. Now building in HealthTech and supporting the climate founder community.',
    tags: ['Industry-specific', 'Networking', 'Workshop'],
    whatToExpect: [
      'Keynote on climate fundraising',
      'Structured networking sessions',
      'Demo tables for MVPs',
      'Post-event drinks',
    ],
    isAttending: false,
    attendeePhotos: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Weekly Pitch Practice',
    type: 'online',
    date: 'Every Tuesday',
    time: '20:00',
    location: 'Google Meet',
    description: 'Sharpen your pitch in a supportive environment. Present your startup idea in 3 minutes, get feedback from fellow founders, and iterate. Perfect for early-stage founders preparing for investor meetings.',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=450&fit=crop',
    attendeeCount: 12,
    maxAttendees: 20,
    hostName: 'Coco Match Team',
    hostPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop',
    hostBio: 'The Coco Match team organizes weekly founder meetups across Europe to help you find your perfect co-founder.',
    tags: ['Pitch Practice', 'Workshop'],
    whatToExpect: [
      '3-minute pitch + 5-minute feedback',
      'Small group of 8-12 founders',
      'Constructive peer feedback',
      'Iterate your pitch weekly',
    ],
    isAttending: false,
    attendeePhotos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'HealthTech Co-founder Search',
    type: 'in-person',
    date: 'April 5, 2026',
    time: '18:00',
    location: 'WeWork London',
    description: 'An exclusive event for founders building in digital health, biotech, and med-tech. Meet technical and business co-founders who share your passion for healthcare innovation.',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop',
    attendeeCount: 19,
    maxAttendees: 25,
    hostName: 'Amira Okafor',
    hostPhoto: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    hostBio: 'NHS doctor turned health-tech founder. Building bridges between medicine and technology.',
    tags: ['Industry-specific', 'Speed Dating', 'Networking'],
    whatToExpect: [
      'Industry keynote speaker',
      'Structured co-founder matching',
      'HealthTech demo showcase',
      'Networking dinner after',
    ],
    isAttending: false,
    attendeePhotos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    ],
  },
];
