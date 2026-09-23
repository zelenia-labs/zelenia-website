/**
 * Progressive Scroll Reveal Engine
 * Uses browser-native IntersectionObserver to trigger smooth, GPU-accelerated
 * entrance animations as elements scroll into the viewport.
 * Safe for SSR and prerendering.
 */
const NOOP = (): void => undefined;

export function initScrollReveal(rootElement: HTMLElement = document.body): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return NOOP;
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return NOOP;
  }

  // Mark document as motion-ready so initial hidden states only apply when JS is active
  document.documentElement.classList.add('motion-ready');

  const targets = rootElement.querySelectorAll<HTMLElement>(
    '.reveal-on-scroll:not(.is-revealed), .interfaces-grid:not(.is-revealed), .clarity-cards-grid:not(.is-revealed), .founders-grid:not(.is-revealed)'
  );

  if (targets.length === 0) return NOOP;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    }
  );

  targets.forEach((target) => observer.observe(target));

  return () => observer.disconnect();
}
