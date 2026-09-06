import { Injectable, signal } from '@angular/core';
import { SiteData } from './studio.model';

@Injectable({
  providedIn: 'root'
})
export class StudioContent {
  private readonly siteData = signal<SiteData>({
    name: 'Zelenia',
    tagline: 'Boutique Frontend Engineering & Product Design Studio',
    url: 'https://zelenia.com',
    description:
      'Zelenia pairs a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer. We repair critical web vitals, rebuild complex digital interfaces, and deliver production-ready software without agency overhead.',
    nav: [
      { label: 'Process', href: '/process' },
      { label: 'Team', href: '/team' },
      { label: 'Advantage', href: '/', fragment: 'advantage' }
    ],
    proofBar: [
      {
        metric: '20+ Years',
        label: 'Enterprise Systems',
        sub: 'Fortune 100 Principal Engineer'
      },
      {
        metric: 'GDE',
        label: 'Google Developer Expert',
        sub: 'Web Technologies & Architecture'
      },
      {
        metric: '10+ Years',
        label: 'Unicorn Product Design',
        sub: 'Seed to Series E Leadership'
      }
    ],
    team: [
      {
        name: 'Alejandro Cuba',
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
        avatarInitials: 'AC',
        avatarImage: 'portrait_alejandro.jpg'
      },
      {
        name: 'Yolanda Santa Cruz',
        role: 'Lead Product Designer & Visual Artist',
        credentials: 'Lead Product Designer & Visual Artist',
        highlights: [
          '10+ Years Experience',
          'Seed to Series E Unicorns',
          'Fortune 500 Enterprises'
        ],
        background:
          '10+ years of experience directing product design across venture-backed technology startups from Seed to Series E, as well as Fortune 500 enterprises. Combines fine-arts composition with systematic UI design and high-conversion interaction models.',
        linkedin: 'https://www.linkedin.com/in/yolandasantacruz/',
        avatarInitials: 'YS',
        avatarImage: 'portrait_yolanda.jpg'
      }
    ],
    partners: [
      {
        name: 'Alejandro Cuba',
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
        avatarInitials: 'AC',
        avatarImage: 'portrait_alejandro.jpg'
      },
      {
        name: 'Yolanda Santa Cruz',
        role: 'Lead Product Designer & Visual Artist',
        credentials: 'Lead Product Designer & Visual Artist',
        highlights: [
          '10+ Years Experience',
          'Seed to Series E Unicorns',
          'Fortune 500 Enterprises'
        ],
        background:
          '10+ years of experience directing product design across venture-backed technology startups from Seed to Series E, as well as Fortune 500 enterprises. Combines fine-arts composition with systematic UI design and high-conversion interaction models.',
        linkedin: 'https://www.linkedin.com/in/yolandasantacruz/',
        avatarInitials: 'YS',
        avatarImage: 'portrait_yolanda.jpg'
      }
    ],
    socials: {
      github: 'https://github.com/zelenia-labs',
      linkedin: 'https://www.linkedin.com/company/zelenia'
    }
  });

  readonly site = this.siteData.asReadonly();
}
