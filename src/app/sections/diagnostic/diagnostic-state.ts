import { Injectable, computed, signal } from '@angular/core';
import { CategoryId, DiagnosticCategory, PaceId, PaceModel } from './diagnostic.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticState {
  readonly categories: DiagnosticCategory[] = [
    {
      id: 'vitals',
      label: 'Performance Engineering Sprint',
      shortLabel: 'Performance Sprint',
      tagline: 'Speed, Smooth Interactions & Load Stability',
      investmentFloor: 'From $6,500',
      division: {
        engineering: 80,
        design: 20,
        label: '80% Engineering / 20% Design'
      },
      turnaround: {
        standard: '2 Weeks',
        accelerated: '1 to 2 Weeks'
      },
      deliverables: {
        standard: [
          'Image compression, responsive media optimization, and clean script loading',
          'Eliminating click delays and sluggish UI interactions',
          'Optimizing heavy photography so pages appear instantly',
          'Stopping unexpected layout jumps and shifting elements while pages load',
          'Taming slow third-party analytics and marketing scripts'
        ],
        accelerated: [
          'Dedicated intensive audit and immediate critical-path pull requests',
          'Real-time interaction lag refactoring and worker offloading',
          'Sub-1.8s page load remediation across top conversion landing templates',
          'Zero-shift visual stability guarantee on key interactive journeys',
          'Daily deployment synchronization and continuous synthetic monitoring'
        ]
      },
      benchmarks: [
        { metric: 'Sub-1.8s', label: 'Page Load Time' },
        { metric: '< 200ms', label: 'Interaction Response' },
        { metric: '0 Jumps', label: 'Visual Stability' },
        { metric: '98+', label: 'Performance Score' }
      ],
      faqs: [
        {
          q: 'Do we need to rewrite our entire backend?',
          a: 'No. We target client-side execution, third-party script loading, critical rendering paths, and asset delivery pipelines without disrupting backend infrastructure.'
        },
        {
          q: 'How quickly will we see measurable speed improvements in production?',
          a: 'Immediate speed gains appear upon staging deployment; Google field data and real user measurements reflect the upgrades over the following weeks as visitors browse the updated site.'
        },
        {
          q: 'How do you isolate the impact of third-party tracking scripts?',
          a: 'We implement efficient loading patterns and background execution so analytics and marketing tags do not slow down your pages or penalize your search rankings.'
        }
      ]
    },
    {
      id: 'responsive',
      label: 'Responsive & Accessibility Overhaul',
      shortLabel: 'Responsive & a11y',
      tagline: 'WCAG 2.2 AA & Multi-Device Parity',
      investmentFloor: 'From $12,000',
      division: {
        engineering: 60,
        design: 40,
        label: '60% Engineering / 40% Design'
      },
      turnaround: {
        standard: '3 to 4 Weeks',
        accelerated: '2 Weeks'
      },
      deliverables: {
        standard: [
          'Fluid breakpoint reconstruction and modern CSS grid/flexbox architecture',
          'Automated & manual WCAG 2.2 AA audit remediation across all device viewports',
          'Complete ARIA 1.3 patterns, keyboard navigation traps & screen reader flows',
          'Clean semantic structure so search engines understand and rank your content',
          'Touch-target calibration (min 44x44px) and fluid typography scaling'
        ],
        accelerated: [
          'Full-scale parallel remediation of high-traffic views with daily staging updates',
          'Immediate repair of screen-reader blockers and keyboard trap vulnerabilities',
          'Mobile viewport refactoring across edge-case device aspect ratios',
          'Comprehensive accessibility conformance statement and VPAT guidance'
        ]
      },
      benchmarks: [
        { metric: '100%', label: 'Viewport Parity' },
        { metric: 'WCAG AA', label: 'Compliance Tier' },
        { metric: '0 Shifts', label: 'Overflow Integrity' },
        { metric: '100/100', label: 'Mobile Usability' }
      ],
      faqs: [
        {
          q: 'Will this impact our current SEO rankings?',
          a: 'Yes, positively. Faster loading speeds, clean semantic code, and reliable mobile layouts help search engines index your pages more effectively and rank them higher.'
        },
        {
          q: 'Can we achieve WCAG 2.2 AA compliance without altering our core brand aesthetic?',
          a: 'Absolutely. We refine contrast ratios, focus indicators, and interactive hit targets while preserving and elevating your established brand identity.'
        },
        {
          q: 'Do you audit with real screen reader software?',
          a: 'Yes. Every interactive element is tested natively with VoiceOver, NVDA, and keyboard-only navigation workflows.'
        }
      ]
    },
    {
      id: 'design-system',
      label: 'Design System & Visual Modernization',
      shortLabel: 'Design System',
      tagline: 'Tokenized UI & Component Modularity',
      investmentFloor: 'From $12,000',
      division: {
        engineering: 40,
        design: 60,
        label: '40% Engineering / 60% Design'
      },
      turnaround: {
        standard: '4 Weeks',
        accelerated: '2 to 3 Weeks'
      },
      deliverables: {
        standard: [
          'Tokenized Figma-to-code design system architecture across color, spacing & typography',
          'Accessible component library with zero-runtime CSS and strict TypeScript props',
          'Comprehensive micro-interaction & motion curves library (GPU accelerated)',
          'Dark mode & high-contrast theme tokens with zero FOUC',
          'Interactive documentation and internal developer adoption guideline suite'
        ],
        accelerated: [
          'Rapid design sprint producing finalized core component primitives in week one',
          'Simultaneous code scaffolding in your production repository',
          'Priority conversion of top 10 revenue-generating product templates',
          'Partner-led engineering workshop for internal engineering team handoff'
        ]
      },
      benchmarks: [
        { metric: '100%', label: 'Token Coverage' },
        { metric: '< 15ms', label: 'Component Render' },
        { metric: 'Zero FOUC', label: 'Dark Mode Theme' },
        { metric: '1:1 Parity', label: 'Figma to Code' }
      ],
      faqs: [
        {
          q: 'How do our internal developers adopt this system?',
          a: 'We provide a documented token library, production-ready framework components, and clear implementation guidelines directly inside your codebase repository.'
        },
        {
          q: 'Does the design system support dark mode and multi-brand theming?',
          a: 'Yes. Our semantic token hierarchy supports dark mode, brand variations, and high-contrast preferences natively using modern CSS custom properties.'
        },
        {
          q: 'How do we prevent design drift after handoff?',
          a: 'We enforce strict token schemas and linting guards that prevent ad-hoc colors or arbitrary spacing from entering your production CSS.'
        }
      ]
    },
    {
      id: 'rebuild',
      label: 'End-to-End Digital Rebuild',
      shortLabel: 'Full Rebuild',
      tagline: 'Zero Technical Debt & Flawless Execution',
      investmentFloor: 'From $24,000',
      division: {
        engineering: 50,
        design: 50,
        label: '50% Engineering / 50% Design'
      },
      turnaround: {
        standard: '6 to 8 Weeks',
        accelerated: '4 to 5 Weeks'
      },
      deliverables: {
        standard: [
          'Complete product redesign from user flows and UX architecture to visual polish',
          'Full-stack frontend architecture overhaul with zero-runtime, modern web primitives',
          'Sub-second load times, smooth interactions, and complete accessibility across all devices',
          'Production deployment pipeline, automated performance regression guards & test suites',
          'High-conversion editorial rhythms, micro-animations, and interactive assets'
        ],
        accelerated: [
          'Dedicated dual-partner intensive commitment with zero context-switching',
          'Weekly end-to-end milestone shipments into staging environment',
          'Immediate architectural and visual convergence with real-time feedback loops',
          'Turnkey production launch with direct partner warranty and operational support'
        ]
      },
      benchmarks: [
        { metric: '0 Debt', label: 'Technical Debt' },
        { metric: 'Sub-1.5s', label: 'Speed Index' },
        { metric: '100%', label: 'Design Parity' },
        { metric: 'Enterprise', label: 'Architecture Grade' }
      ],
      faqs: [
        {
          q: 'Can two people really deliver what a full agency promises?',
          a: 'Yes. By working directly with the designers and engineers building your site, we design, build, and ship faster with direct communication and personal attention to detail.'
        },
        {
          q: 'What does working directly with you look like day to day?',
          a: 'We connect in shared Slack or Discord channels, send clear asynchronous video walkthroughs as we make progress, and share weekly staging updates so you’re always in the loop.'
        },
        {
          q: 'What tech stack do you recommend for our rebuild?',
          a: "We assess your team's existing workflow and runtime needs, specializing in modern performant architectures (Angular, Vanilla/Vite, Next/React) that maximize longevity and minimize bloat."
        }
      ]
    }
  ];

  readonly paces: PaceModel[] = [
    {
      id: 'standard',
      label: 'Standard Sprint (Phased)',
      badge: 'Phased Deployment',
      description:
        'Structured sprint cadence with scheduled milestone deliverables and asynchronous feedback loops.'
    },
    {
      id: 'accelerated',
      label: 'Accelerated Priority (Dedicated Intensive)',
      badge: 'Full Partner Immersion',
      description:
        'Immediate dedicated focus with daily synchronization, expedited pull requests, and rapid turnaround.'
    }
  ];

  readonly activeCategoryId = signal<CategoryId>('vitals');
  readonly activePaceId = signal<PaceId>('standard');

  readonly activeCategory = computed(() => {
    const id = this.activeCategoryId();
    return this.categories.find((c) => c.id === id) ?? this.categories[0];
  });

  readonly isAccelerated = computed(() => this.activePaceId() === 'accelerated');

  readonly turnaroundText = computed(() => {
    const cat = this.activeCategory();
    return this.isAccelerated() ? cat.turnaround.accelerated : cat.turnaround.standard;
  });

  readonly investmentFloor = computed(() => this.activeCategory().investmentFloor);

  readonly paceCadenceLabel = computed(() =>
    this.isAccelerated() ? 'Dedicated Intensive Cadence' : 'Phased Sprint Cadence'
  );

  readonly deliverables = computed(() => {
    const cat = this.activeCategory();
    return this.isAccelerated() ? cat.deliverables.accelerated : cat.deliverables.standard;
  });

  readonly benchmarks = computed(() => this.activeCategory().benchmarks);

  readonly faqs = computed(() => this.activeCategory().faqs);

  selectCategory(id: CategoryId): void {
    this.activeCategoryId.set(id);
  }

  setPace(id: PaceId): void {
    this.activePaceId.set(id);
  }
}
