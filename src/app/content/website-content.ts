import { computed, Injectable, signal } from '@angular/core';
import { NavItem, NAVIGATION_ITEMS } from './navigation';
import { TeamMember, Partner, TEAM_MEMBERS, PARTNERS } from './team';
import { SocialLinks, SOCIAL_LINKS } from './social';

export interface WebsiteInfo {
  name: string;
  tagline: string;
  url: string;
  description: string;
}

export interface SiteData extends WebsiteInfo {
  nav: NavItem[];
  team: TeamMember[];
  partners: Partner[];
  socials: SocialLinks;
}

export const WEBSITE_INFO: WebsiteInfo = {
  name: 'Zelenia',
  tagline: 'Frontend Engineering & Product Design Studio',
  url: 'https://zelenia.com',
  description:
    'Zelenia pairs a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer. We repair critical web vitals, rebuild complex digital interfaces, and deliver production-ready software without agency overhead.'
};

@Injectable({
  providedIn: 'root'
})
export class WebsiteContent {
  readonly info = signal<WebsiteInfo>(WEBSITE_INFO).asReadonly();
  readonly nav = signal<NavItem[]>(NAVIGATION_ITEMS).asReadonly();
  readonly team = signal<TeamMember[]>(TEAM_MEMBERS).asReadonly();
  readonly partners = signal<Partner[]>(PARTNERS).asReadonly();
  readonly socials = signal<SocialLinks>(SOCIAL_LINKS).asReadonly();

  readonly site = computed<SiteData>(() => ({
    name: this.info().name,
    tagline: this.info().tagline,
    url: this.info().url,
    description: this.info().description,
    nav: this.nav(),
    team: this.team(),
    partners: this.partners(),
    socials: this.socials()
  }));
}
