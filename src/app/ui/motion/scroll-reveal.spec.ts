import { initScrollReveal } from './scroll-reveal';

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];
  readonly observed = new Set<Element>();
  readonly unobserved = new Set<Element>();
  disconnected = false;

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) {
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? '0px';
    const threshold = options.threshold ?? 0;
    this.thresholds = Array.isArray(threshold) ? threshold : [threshold];
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.observed.add(target);
  }

  unobserve(target: Element): void {
    this.unobserved.add(target);
    this.observed.delete(target);
  }

  disconnect(): void {
    this.disconnected = true;
    this.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(entries: { target: Element; isIntersecting: boolean }[]): void {
    const fullEntries = entries.map(
      ({ target, isIntersecting }) =>
        ({
          target,
          isIntersecting
        }) as IntersectionObserverEntry
    );
    this.callback(fullEntries, this);
  }
}

describe('initScrollReveal', () => {
  let root: HTMLElement;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      })
    );

    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
    document.documentElement.classList.remove('motion-ready');
    vi.unstubAllGlobals();
  });

  it('adds motion-ready, observes unrevealed targets, reveals on intersection, and cleans up', () => {
    const header = document.createElement('div');
    header.className = 'reveal-on-scroll';
    const card = document.createElement('div');
    card.className = 'reveal-on-scroll';
    const alreadyRevealed = document.createElement('div');
    alreadyRevealed.className = 'reveal-on-scroll is-revealed';
    root.append(header, card, alreadyRevealed);

    const cleanup = initScrollReveal(root);

    expect(document.documentElement.classList.contains('motion-ready')).toBe(true);
    expect(MockIntersectionObserver.instances.length).toBe(1);

    const observer = MockIntersectionObserver.instances[0];
    expect(observer.thresholds).toEqual([0.01]);
    expect(observer.rootMargin).toBe('0px 0px -24px 0px');
    expect(observer.observed.has(header)).toBe(true);
    expect(observer.observed.has(card)).toBe(true);
    expect(observer.observed.has(alreadyRevealed)).toBe(false);

    observer.trigger([
      { target: header, isIntersecting: true },
      { target: card, isIntersecting: false }
    ]);

    expect(header.classList.contains('is-revealed')).toBe(true);
    expect(observer.unobserved.has(header)).toBe(true);
    expect(card.classList.contains('is-revealed')).toBe(false);

    cleanup();
    expect(observer.disconnected).toBe(true);
  });

  it('works when window.matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);

    const el = document.createElement('div');
    el.className = 'reveal-on-scroll';
    root.appendChild(el);

    const cleanup = initScrollReveal(root);

    expect(document.documentElement.classList.contains('motion-ready')).toBe(true);
    expect(MockIntersectionObserver.instances.length).toBe(1);
    expect(MockIntersectionObserver.instances[0].observed.has(el)).toBe(true);

    cleanup();
  });

  it('skips motion-ready and observer setup when prefers-reduced-motion matches', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      })
    );

    const el = document.createElement('div');
    el.className = 'reveal-on-scroll';
    root.appendChild(el);

    const cleanup = initScrollReveal(root);

    expect(document.documentElement.classList.contains('motion-ready')).toBe(false);
    expect(MockIntersectionObserver.instances.length).toBe(0);
    cleanup();
  });
});
