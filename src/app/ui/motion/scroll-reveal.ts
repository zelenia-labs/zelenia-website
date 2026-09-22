/**
 * Progressive Scroll Reveal Engine
 * Uses browser-native IntersectionObserver to trigger smooth, GPU-accelerated
 * entrance animations as elements scroll into the viewport.
 * Safe for SSR and prerendering.
 */
export function initScrollReveal(rootElement: HTMLElement = document.body): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {};
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  // Mark document as motion-ready so initial hidden states only apply when JS is active
  document.documentElement.classList.add('motion-ready');

  const targets = rootElement.querySelectorAll<HTMLElement>(
    '.reveal-on-scroll:not(.is-revealed), .interfaces-grid:not(.is-revealed), .clarity-cards-grid:not(.is-revealed), .founders-grid:not(.is-revealed)'
  );

  if (targets.length === 0) return () => {};

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
