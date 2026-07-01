/**
 * @file
 * Fixed “scroll to top” control: show after scrolling, smooth scroll on click.
 */
(function (Drupal, once) {
  'use strict';

  const SCROLL_THRESHOLD = 150;

  Drupal.behaviors.scsManagerScrollToTop = {
    attach(context) {
      once('scs-manager-scroll-to-top', '.scs-manager--scroll-to-top', context).forEach((button) => {
        const updateVisibility = () => {
          const visible = window.scrollY > SCROLL_THRESHOLD;
          button.classList.toggle('is-visible', visible);
          button.toggleAttribute('hidden', !visible);
        };

        button.addEventListener('click', () => {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        });

        window.addEventListener('scroll', updateVisibility, { passive: true });
        updateVisibility();
      });
    },
  };
})(Drupal, once);
