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
    role: 'Frontend Architect & GDE',
    credentials: 'Frontend Architect & Google Developer Expert (GDE)',
    highlights: ['20+ Years Experience', 'Google Developer Expert', 'Frontend Architecture'],
    background:
      'Software engineer and Google Developer Expert who loves building fast, resilient web applications. With over 20 years of experience, Alejandro focuses on clean modern code, sub-second load times, and rock-solid architecture.',
    linkedin: 'https://www.linkedin.com/in/alejandrocuba/',
    avatarInitials: 'ACR',
    avatarImage: 'portrait_alejandro.jpg'
  },
  {
    name: 'Yolanda Santa Cruz',
    role: 'Lead Product Designer & Visual Artist',
    credentials: 'Lead Product Designer & Visual Artist',
    highlights: ['10+ Years Experience', 'Product Design', 'Visual Systems'],
    background:
      'Product designer and visual artist with over a decade of experience shaping brand identities and digital experiences. Yolanda focuses on thoughtful visual systems, typography, and interfaces that feel effortless to use.',
    linkedin: 'https://www.linkedin.com/in/yolandasantacruz/',
    avatarInitials: 'YSC',
    avatarImage: 'portrait_yolanda.jpg'
  }
];

export const PARTNERS: Partner[] = TEAM_MEMBERS;
