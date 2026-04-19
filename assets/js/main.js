/**
 * Christopher Francisque — main.js
 *
 * Responsibilities (kept intentionally small):
 *   1. Mobile nav toggle.
 *   2. Sticky-nav scroll state + active-section highlighting.
 *   3. Smooth scroll for in-page anchors (with reduced-motion respect).
 *   4. Scroll-triggered fade-in (Intersection Observer).
 *   5. Live GitHub commits counter — fetches /stats.json, falls back to a
 *      direct GitHub GraphQL call only if you've supplied a public token
 *      (we don't, by default — the static stats.json is the source of truth).
 *   6. Footer year stamp.
 *
 * No frameworks, no build step. Loaded with `defer`.
 */
(() => {
  'use strict';

  /* ---------- 1. Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Sticky nav state + active link ---------- */
  const nav = document.getElementById('nav');
  const sectionEls = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));

  const setNavScrolled = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  setNavScrolled();
  window.addEventListener('scroll', setNavScrolled, { passive: true });

  // Active link via IntersectionObserver
  if ('IntersectionObserver' in window && sectionEls.length) {
    const linkById = new Map(
      navLinks
        .filter((a) => a.getAttribute('href')?.startsWith('#'))
        .map((a) => [a.getAttribute('href').slice(1), a])
    );

    const activeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkById.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionEls.forEach((s) => activeObs.observe(s));
  }

  /* ---------- 3. Scroll reveal ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.section, .project, .timeline__item, .hero__photo');
    targets.forEach((el) => el.classList.add('reveal'));

    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    targets.forEach((el) => revealObs.observe(el));
  }

  /* ---------- 4. GitHub commits widget ---------- */
  const STATS_URL = './stats.json';
  const numEl = document.getElementById('commits-count');
  const updatedEl = document.getElementById('stats-updated');

  /**
   * Format a count with thousands separators.
   * Use Intl.NumberFormat so it respects user locale.
   */
  const fmt = (n) => new Intl.NumberFormat(undefined).format(n);

  /**
   * Format an ISO date as "Apr 19, 2026".
   */
  const fmtDate = (iso) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const setStats = (count, updatedAt) => {
    if (numEl) {
      numEl.textContent = (typeof count === 'number') ? fmt(count) : numEl.dataset.fallback || '—';
    }
    if (updatedEl && updatedAt) {
      updatedEl.textContent = `Updated ${fmtDate(updatedAt)} · auto-refreshed daily.`;
    }
  };

  // Try the static stats.json first — that's our source of truth (updated daily by GitHub Actions).
  fetch(STATS_URL, { cache: 'no-cache' })
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((data) => {
      const n = Number(data.commits_last_year);
      if (!Number.isFinite(n)) throw new Error('No commits_last_year in stats.json');
      setStats(n, data.updated_at);
    })
    .catch((err) => {
      // Soft fallback: keep the placeholder, log for debugging only.
      console.warn('[stats] could not load stats.json:', err.message);
      setStats(undefined, undefined);
      if (updatedEl) {
        updatedEl.textContent = 'Live GitHub stats temporarily unavailable.';
      }
    });

  /* ---------- 5. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
