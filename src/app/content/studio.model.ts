export interface Partner {
  name: string;
  role: string;
  credentials: string;
  highlights: string[];
  background: string;
  linkedin: string;
  avatarInitials: string;
  avatarImage?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProofItem {
  metric: string;
  label: string;
  sub: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  url: string;
  description: string;
  nav: NavItem[];
  proofBar: ProofItem[];
  partners: Partner[];
  socials: SocialLinks;
}
