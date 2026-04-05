/* ============================================================
   Ayyvira Naturals — Main JavaScript
   ============================================================ */

/* ── Sticky Nav Shadow ── */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
})();

/* ── Active Nav Link ── */
(function () {
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Hamburger / Mobile Menu ── */
(function () {
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ── Fade-in on Scroll ── */
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ── Product Filter (Products Page) ── */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.opacity    = '0';
        card.style.transform  = 'scale(0.95)';
        card.style.transition = 'opacity .3s ease, transform .3s ease';

        setTimeout(() => {
          card.style.display = show ? '' : 'none';
          if (show) {
            requestAnimationFrame(() => {
              card.style.opacity   = '1';
              card.style.transform = 'scale(1)';
            });
          }
        }, 200);
      });
    });
  });
})();

/* ── Contact Form Validation & Submission ── */
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('successMessage');
  if (!form) return;

  /* Helper: show / clear error */
  function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(fieldId + 'Error');
    if (!field || !err) return;
    field.classList.add('error');
    err.textContent = msg;
    err.classList.add('show');
  }
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(fieldId + 'Error');
    if (!field || !err) return;
    field.classList.remove('error');
    err.classList.remove('show');
  }

  /* Live validation */
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  /* Validate all fields, return true if valid */
  function validate() {
    let valid = true;

    const name = document.getElementById('name');
    if (!name || name.value.trim().length < 2) {
      showError('name', 'Please enter your full name (min 2 characters).');
      valid = false;
    } else { clearError('name'); }

    const email = document.getElementById('email');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email.value.trim())) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    } else { clearError('email'); }

    const message = document.getElementById('message');
    if (!message || message.value.trim().length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      valid = false;
    } else { clearError('message'); }

    return valid;
  }

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText  = submitBtn.innerHTML;

    /* Loading state */
    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg> Sending…';

    /* ── Formspree submission (update YOUR_FORM_ID) ── */
    const FORMSPREE_ID = 'mreooyre'; // ← replace with your Formspree form ID

    try {
      if (FORMSPREE_ID !== 'YOUR_FORM_ID') {
        /* Real Formspree endpoint */
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method : 'POST',
          headers: { 'Accept': 'application/json' },
          body   : new FormData(form)
        });
        if (!res.ok) throw new Error('Formspree error');
      } else {
        /* Demo: simulate 1.5s delay then show success */
        await new Promise(r => setTimeout(r, 1500));
      }

      /* Show success */
      form.style.display    = 'none';
      success.style.display = 'block';
      success.classList.add('show');
      form.reset();
    } catch (err) {
      alert('Something went wrong. Please try again or email us directly.');
      submitBtn.disabled  = false;
      submitBtn.innerHTML = origText;
    }
  });
})();

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Spin animation for loading ── */
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin .8s linear infinite; display: inline-block; }
`;
document.head.appendChild(spinStyle);
