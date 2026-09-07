/**
 * NY MedCare — Navigation & Accessibility (nav.js)
 * Manages mobile drawer toggle, focus trapping, Escape handling,
 * and smooth on-page anchor navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.mobile-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav a, .nav a, a[href^="#"]');

  if (!burger || !overlay) return;

  let isOpen = false;
  const focusableEls = overlay.querySelectorAll('a, button');
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];

  function openMenu() {
    isOpen = true;
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Stagger navigation items
    const links = overlay.querySelectorAll('.mobile-nav a');
    links.forEach((link, idx) => {
      link.style.transitionDelay = `${0.10 + idx * 0.06}s`;
    });

    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 150);
    }
  }

  function closeMenu() {
    isOpen = false;
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    burger.focus();
  }

  burger.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Focus trap inside overlay
  overlay.addEventListener('keydown', (e) => {
    if (!isOpen || e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });

  // Smooth scroll for anchor links & close drawer if clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          if (isOpen) closeMenu();

          const headerHeight = 70;
          const targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });

          // Set URL hash cleanly without instant jump
          history.pushState(null, '', href);
        }
      }
    });
  });
});
