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
    'Zelenia is Yolanda Santa Cruz and Alejandro Cuba, a design and engineering couple crafting fast, beautiful websites together with personal care and zero agency runaround.'
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
