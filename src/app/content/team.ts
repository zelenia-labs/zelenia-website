export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  highlights: string[];
  background: string;
  linkedin: string;
  avatarInitials: string;
  avatarImage?: string;
}

export type Partner = TeamMember;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alejandro Cuba Ruiz',
    role: 'Principal Frontend Architect & GDE',
    credentials: 'Principal Frontend Architect & Google Developer Expert (GDE)',
    highlights: [
      '20+ Years Experience',
      'Fortune 100 Principal Engineer',
      'Google Developer Expert'
    ],
    background:
      '20+ years of software engineering leadership, currently serving as a Principal Software Engineer at a Fortune 100 enterprise. Specializes in scalable frontend architecture, runtime optimization, and high-resilience web applications.',
    linkedin: 'https://www.linkedin.com/in/alejandrocuba/',
    avatarInitials: 'ACR',
    avatarImage: 'portrait_alejandro.jpg'
  },
  {
    name: 'Yolanda Santa Cruz',
    role: 'Lead Product Designer',
    credentials: 'Lead Product Designer',
    highlights: ['10+ Years Experience', 'Seed to Series E Unicorns', 'Fortune 500 Enterprises'],
    background:
      '10+ years of experience leading UX and product design across venture-backed technology startups from Seed to Series E, as well as Fortune 500 enterprises. Specializes in art direction, visual conversion psychology, user experience, and aesthetic elevation for high-performance digital products.',
    linkedin: 'https://www.linkedin.com/in/yolandasantacruz/',
    avatarInitials: 'YSC',
    avatarImage: 'portrait_yolanda.jpg'
  }
];

export const PARTNERS: Partner[] = TEAM_MEMBERS;
