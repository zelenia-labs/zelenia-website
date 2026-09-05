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
      'Zelenia is an elite two-partner studio pairing a Fortune 100 Principal Engineer with an industry-tested Lead Product Designer. We repair critical web vitals, rebuild complex digital interfaces, and deliver production-ready software without the agency overhead.',
    nav: [
      { label: 'Who We Are', href: '#leadership' },
      { label: 'The Model', href: '#advantage' },
      { label: 'Capabilities', href: '#capabilities' },
      { label: 'Diagnostic', href: '#diagnostic' },
      { label: 'Contact', href: '#contact' }
    ],
    proofBar: [
      {
        metric: '20+',
        label: 'Years Enterprise Architecture',
        sub: 'Fortune 100 Principal Engineer'
      },
      {
        metric: '10+',
        label: 'Years Unicorn Product Design',
        sub: 'Seed to Series E Leadership'
      },
      {
        metric: 'GDE',
        label: 'Google Developer Expert',
        sub: 'Web Technologies & Architecture'
      }
    ],
    partners: [
      {
        name: 'Alejandro Cuba',
        role: 'Software Engineering Partner',
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
        name: 'Yolanda Santacruz',
        role: 'Product Design Partner',
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
