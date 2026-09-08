/**
 * NY MedCare — Scroll Engine v2 (engine.js)
 * Manages smoothScroll, v2 channel writes, real horizontal pinned scroll (S7),
 * S8 modal dialog, S9 vaccine index swapper, S12 tint-morphing quote rig,
 * S14 FAQ sticky index, and the desktop section-index rail.
 */

export let smoothScroll = 0;
window.GL = window.GL || { processTop: 0, processLen: 1, proofTop: 0, proofLen: 1, ctaTop: 0 };

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const seg = (a, b, s) => clamp((s - a) / (b - a), 0, 1);
const smoothstep = (a, b, s) => { const t = seg(a, b, s); return t * t * (3 - 2 * t); };
const setVar = (el, k, v) => el && el.style.setProperty(k, v);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileAspect = window.matchMedia('(max-aspect-ratio: 11/10)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  // DOM Elements
  const header = document.querySelector('header.hdr');
  const processRig = document.getElementById('process');
  const processTrack = processRig ? processRig.querySelector('.track') : null;
  const hpanels = processTrack ? processTrack.querySelectorAll('.hpanel') : [];
  const proofRig = document.querySelector('section.rig.proof');
  const proofStage = proofRig ? proofRig.querySelector('.proof-stage') : null;
  const ctaEl = document.querySelector('section.cta');
  const mosaicEl = document.querySelector('.mosaic');
  const sealEl = document.querySelector('.seal');
  const arcSec = document.querySelector('.arc-section');

  // Mark body as loaded
  setTimeout(() => { document.body.classList.add('is-loaded'); }, 100);

  // Cached measurements (measured on load and debounced resize)
  const M = {
    docLen: 5000,
    processTop: 2500,
    processLen: 2000,
    proofTop: 5000,
    proofLen: 1800,
    ctaTop: 7000
  };

  function updateMeasurements() {
    M.docLen = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (processRig) {
      M.processTop = processRig.offsetTop;
      M.processLen = Math.max(1, processRig.offsetHeight - window.innerHeight);
    }
    if (proofRig) {
      M.proofTop = proofRig.offsetTop;
      M.proofLen = Math.max(1, proofRig.offsetHeight - window.innerHeight);
    }
    if (ctaEl) {
      M.ctaTop = ctaEl.offsetTop;
    }

    // Publish to GL
    window.GL.processTop = M.processTop;
    window.GL.processLen = M.processLen;
    window.GL.proofTop = M.proofTop;
    window.GL.proofLen = M.proofLen;
    window.GL.ctaTop = M.ctaTop;
  }

  updateMeasurements();
  window.addEventListener('resize', debounce(updateMeasurements, 150));
  window.addEventListener('load', updateMeasurements);

  // S5: Masked Mosaic layout
  function layoutMosaic() {
    if (!mosaicEl) return;
    const r = mosaicEl.getBoundingClientRect();
    mosaicEl.style.setProperty('--mos-w', r.width.toFixed(1) + 'px');
    mosaicEl.style.setProperty('--mos-h', r.height.toFixed(1) + 'px');
    mosaicEl.querySelectorAll('.mos-card').forEach(c => {
      const b = c.getBoundingClientRect();
      c.style.setProperty('--mx', (-(b.left - r.left)).toFixed(1) + 'px');
      c.style.setProperty('--my', (-(b.top - r.top)).toFixed(1) + 'px');
    });
  }
  if (mosaicEl) {
    layoutMosaic();
    window.addEventListener('resize', debounce(layoutMosaic, 150));
    window.addEventListener('load', layoutMosaic);
    if (document.fonts) document.fonts.ready.then(layoutMosaic);
  }

  // S3: Arc length calculations
  if (arcSec) {
    const arcLines = arcSec.querySelectorAll('.arc-line');
    arcLines.forEach(line => {
      try {
        const len = line.getTotalLength();
        line.style.setProperty('--len', Math.ceil(len));
      } catch (e) {
        line.style.setProperty('--len', 600);
      }
    });
  }

  // S15: Seal length
  if (sealEl) {
    const rings = sealEl.querySelectorAll('.ring');
    rings.forEach(ring => {
      try {
        const len = ring.getTotalLength();
        ring.style.setProperty('--len', Math.ceil(len));
      } catch (e) {
        ring.style.setProperty('--len', 400);
      }
    });
  }

  // Smooth scroll lerp setup
  let targetScroll = window.scrollY;
  let lastS = window.scrollY;
  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
  }, { passive: true });

  // S12 Quote state
  const quoteData = [
    {
      text: "Dr. Irshad and her team are phenomenal. I came in for my immigration physical and was seen within 20 minutes. Professional, thorough, and genuinely caring.",
      name: "Maria S.",
      place: "Manhattan, NY",
      tag: "Immigration Physical"
    },
    {
      text: "I had lost my childhood vaccination records and thought it would be a nightmare. They ordered titers instead, told me exactly where to go, and my sealed form was ready that same week.",
      name: "Joseph A.",
      place: "Queens, NY",
      tag: "I-693 Exam"
    },
    {
      text: "Clear pricing, no surprise bills, and they explained every part of the form. The appointment took about an hour and I left knowing exactly what to do next.",
      name: "Rina P.",
      place: "Brooklyn, NY",
      tag: "Green Card Exam"
    }
  ];
  let activeQuote = -1;
  const quoteTextEl = document.querySelector('.quote-text');
  const quoteNameEl = document.querySelector('.quote-name');
  const quotePlaceEl = document.querySelector('.quote-place');
  const quoteTagEl = document.querySelector('.quote-tag');
  const quoteBars = document.querySelectorAll('.quote-bar');

  function renderQuote(q) {
    if (!quoteTextEl || !quoteData[q]) return;
    quoteTextEl.style.opacity = '0';
    quoteTextEl.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      quoteTextEl.textContent = quoteData[q].text;
      if (quoteNameEl) quoteNameEl.textContent = quoteData[q].name;
      if (quotePlaceEl) quotePlaceEl.textContent = quoteData[q].place;
      if (quoteTagEl) quoteTagEl.textContent = quoteData[q].tag;

      quoteBars.forEach((bar, idx) => {
        bar.classList.toggle('is-active', idx === q);
      });

      quoteTextEl.style.opacity = '1';
      quoteTextEl.style.transform = 'translateY(0)';
    }, 120);
  }

  // Canvas opacity calculation (§6 table)
  function glOpacity(s, M) {
    if (s <= 640) return 0.55 - smoothstep(0, 640, s) * 0.39;
    if (s < M.processTop) return 0.16;
    if (s <= M.processTop + 300) return 0.16 + smoothstep(M.processTop, M.processTop + 300, s) * 0.26;
    if (s <= M.processTop + M.processLen) return 0.42;
    if (s <= M.processTop + M.processLen + 400) return 0.42 - smoothstep(M.processTop + M.processLen, M.processTop + M.processLen + 400, s) * 0.26;
    if (s < M.ctaTop - 400) return 0.16;
    return 0.16 + smoothstep(M.ctaTop - 400, M.ctaTop + 300, s) * 0.44;
  }

  // Scroll cue fading
  const scrollCue = document.querySelector('.scroll-cue');

  // Main rAF Loop
  function rafLoop() {
    if (isReducedMotion) {
      smoothScroll = window.scrollY;
      window.smoothScroll = smoothScroll;
      setVar(root, '--gl-op', '0.55');
      requestAnimationFrame(rafLoop);
      return;
    }

    const diff = targetScroll - smoothScroll;
    if (Math.abs(diff) > 0.05) {
      smoothScroll += diff * 0.12;
    } else {
      smoothScroll = targetScroll;
    }
    window.smoothScroll = smoothScroll;

    const s = smoothScroll;

    // Header progress hairline
    setVar(root, '--prog', (clamp(s / M.docLen, 0, 1) * 100).toFixed(2) + '%');

    // Header sticky toggle with hysteresis
    if (header) {
      if (s > 40 && !header.classList.contains('is-stuck')) {
        header.classList.add('is-stuck');
      } else if (s < 32 && header.classList.contains('is-stuck')) {
        header.classList.remove('is-stuck');
      }
    }

    // Scroll cue fade
    if (scrollCue) {
      scrollCue.style.opacity = s > 120 ? '0' : '1';
    }

    // S1 Hero channels
    const intro = smoothstep(60, 640, s);
    const heroYMult = isMobileAspect ? -110 : -170;
    const heroImgYMult = isMobileAspect ? -34 : -70;
    const heroImgScaleMult = isMobileAspect ? 0.03 : 0.06;

    setVar(root, '--hero-y', (intro * heroYMult).toFixed(1) + 'px');
    setVar(root, '--hero-img-y', (intro * heroImgYMult).toFixed(1) + 'px');
    setVar(root, '--hero-img-s', (1 + intro * heroImgScaleMult).toFixed(4));
    setVar(root, '--hero-opacity', (1 - intro).toFixed(3));
    setVar(root, '--sub-y', (intro * 78).toFixed(1) + 'px');
    setVar(root, '--sub-opacity', (1 - intro).toFixed(3));
    setVar(root, '--veil', (intro * 0.55).toFixed(3));

    // S2 Credential ribbon velocity marquee & skew
    setVar(root, '--marq-x', (-(s * 0.045) % 50).toFixed(2) + '%');
    const vel = s - lastS;
    lastS = s;
    setVar(root, '--skew', clamp(vel * 0.22, -8, 8).toFixed(2) + 'deg');

    // S5 Mosaic drift
    if (mosaicEl) {
      const mr = mosaicEl.getBoundingClientRect();
      const mp = clamp((window.innerHeight - mr.top) / (window.innerHeight + mr.height), 0, 1);
      setVar(mosaicEl, '--mos-drift', ((mp - 0.5) * 24).toFixed(1) + 'px');
    }

    // S7 Horizontal Pinned Scroll
    if (processRig && processTrack && !isTouch && window.innerWidth > 900) {
      const p7 = clamp((s - M.processTop) / M.processLen, 0, 1);
      const maxX = Math.max(0, processTrack.scrollWidth - window.innerWidth);
      const railXVal = (-p7 * maxX);
      setVar(processRig, '--rail-p', p7.toFixed(4));
      setVar(processRig, '--rail-x', railXVal.toFixed(1) + 'px');

      // Per-panel lit focus
      hpanels.forEach(p => {
        const cx = p.offsetLeft + p.offsetWidth / 2 + railXVal;
        const a = clamp(1 - Math.abs(cx - window.innerWidth / 2) / (window.innerWidth * 0.55), 0, 1);
        p.style.setProperty('--a', a.toFixed(3));
        if (a > 0.7) p.classList.add('is-lit');
        else p.classList.remove('is-lit');
      });
    }

    // S12 Pinned Quote Rig (ground tint shifts)
    if (proofRig && proofStage && !isTouch && window.innerWidth > 900) {
      const p12 = clamp((s - M.proofTop) / M.proofLen, 0, 1);
      const q = Math.min(2, Math.floor(p12 * 3));
      if (q !== activeQuote) {
        activeQuote = q;
        const tints = ['#fbfaf7', '#f5f2ea', '#f1f5f3'];
        proofStage.style.backgroundColor = tints[q];
        renderQuote(q);
      }
    }

    // Canvas opacity
    const targetGl = glOpacity(s, M);
    const maxGl = isMobileAspect ? 0.34 : 0.60;
    setVar(root, '--gl-op', Math.min(targetGl, maxGl).toFixed(3));

    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);

  // IntersectionObserver for reveals & S15 seal trigger
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('is-in');

        if (target.classList.contains('cta') && sealEl) {
          sealEl.classList.add('is-drawn');
          setTimeout(() => {
            sealEl.classList.add('is-stamped');
          }, 900);
        }

        obs.unobserve(target); // Never re-animate
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('[data-reveal], .act, .arc-section, section.cta').forEach(el => {
    revealObserver.observe(el);
  });

  // S8: Modal Dialog Controller (A27)
  const modal = document.getElementById('checklist-modal');
  const openBtn = document.getElementById('open-checklist-btn');
  const closeBtn = document.getElementById('close-checklist-btn');

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) setTimeout(() => closeBtn.focus(), 150);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // S9: Vaccine Tablist Index Swapper
  const vaxButtons = document.querySelectorAll('.vax-list button');
  const vaxBar = document.querySelector('.vax-bar');
  const vaxDetailTitle = document.querySelector('.vax-detail-title');
  const vaxDetailBody = document.querySelector('.vax-detail-body');
  const vaxDetailNum = document.querySelector('.vax-detail .n');

  function selectVax(button, idx) {
    if (!button) return;
    vaxButtons.forEach(b => b.setAttribute('aria-selected', 'false'));
    button.setAttribute('aria-selected', 'true');

    if (vaxBar) {
      setVar(root, '--idx-y', button.offsetTop + 'px');
    }

    if (vaxDetailTitle && vaxDetailBody) {
      vaxDetailTitle.textContent = button.dataset.title || button.textContent;
      vaxDetailBody.textContent = button.dataset.body || '';
      if (vaxDetailNum) vaxDetailNum.textContent = (idx + 1 < 10 ? '0' : '') + (idx + 1);
    }
  }

  vaxButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => selectVax(btn, idx));
    btn.addEventListener('mouseenter', () => selectVax(btn, idx));
  });

  // S14: FAQ Accordion & Sticky Index
  const faqLinks = document.querySelectorAll('.faq-index a');
  const faqItems = document.querySelectorAll('.faq-accordion details');

  faqLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (faqItems[idx]) {
        faqItems.forEach(item => item.removeAttribute('open'));
        faqItems[idx].setAttribute('open', 'true');
        faqItems[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
        faqLinks.forEach(l => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'true');
      }
    });
  });

  // FAQ scroll spy
  const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.faqIndex;
        if (id && faqLinks[id]) {
          faqLinks.forEach(l => l.removeAttribute('aria-current'));
          faqLinks[id].setAttribute('aria-current', 'true');
        }
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  faqItems.forEach((item, idx) => {
    item.dataset.faqIndex = idx;
    faqObserver.observe(item);
  });

  // Section Index Rail (.rail) Spy
  const railLinks = document.querySelectorAll('.rail a');
  const railSections = document.querySelectorAll('main > section');

  const railObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id) {
          railLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  railSections.forEach(sec => railObserver.observe(sec));

  // Live Clinic Status Checker (America/New_York)
  function updateLiveStatus() {
    const dots = document.querySelectorAll('.pulse-dot');
    const textEls = document.querySelectorAll('.status-pill span:last-child, .band-p2 .status-val');

    try {
      // Mon-Fri only. Saturday was dropped when the practice hours changed.
      const HOURS = { 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: null, 0: null };
      const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const fmtHour = h => (h % 12 || 12) + ':00 ' + (h < 12 ? 'AM' : 'PM');
      const nyc = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const day = nyc.getDay();
      const span = HOURS[day];
      const hrs = nyc.getHours() + nyc.getMinutes() / 60;
      const isOpen = !!span && hrs >= span[0] && hrs < span[1];

      dots.forEach(d => {
        d.className = isOpen ? 'pulse-dot is-open' : 'pulse-dot';
      });

      // Derive the next opening rather than assuming "tomorrow": on a Friday
      // evening the next open day is Monday, not Saturday.
      let msg;
      if (isOpen) {
        msg = 'Open now — closes ' + fmtHour(span[1]);
      } else if (span && hrs < span[0]) {
        msg = 'Closed — opens ' + fmtHour(span[0]);
      } else {
        for (let i = 1; i <= 7; i++) {
          const nd = (day + i) % 7;
          if (HOURS[nd]) { msg = 'Closed — opens ' + DAY_NAMES[nd] + ' ' + fmtHour(HOURS[nd][0]); break; }
        }
      }
      textEls.forEach(t => { t.textContent = msg; });
    } catch (e) {}
  }
  updateLiveStatus();
  setInterval(updateLiveStatus, 60000);

  // GoHighLevel Widget & S10 video defer
  window.addEventListener('load', () => {
    const bookVideo = document.querySelector('.book-media video');
    if (bookVideo && !isReducedMotion) {
      const source = bookVideo.querySelector('source[data-src]');
      if (source && !source.src) {
        source.src = source.dataset.src;
        bookVideo.load();
        bookVideo.play().catch(() => {});
      }
    }

    // The calendar embed is sized by link.msgsndr.com/js/embed.js, attached
    // from the page. The old widgets loader.js was for the previous bare
    // widget URL and is no longer needed.
  });
});

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
