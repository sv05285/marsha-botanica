/**
 * Marsha Botanica — Launch Mode Controller
 *
 * Hard-locked to pre-launch mode until inventory is ready.
 */
(function () {
  function getMode() {
    return 'pre';
  }

  function setVisibility(elements, shouldShow) {
    elements.forEach((el) => {
      el.classList.toggle('hidden', !shouldShow);
      el.hidden = !shouldShow;
      if (shouldShow) {
        el.style.removeProperty('display');
      } else {
        el.style.setProperty('display', 'none');
      }
    });
  }

  function setText(el, text, className) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('is-success', 'is-error');
    if (className) el.classList.add(className);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const isLive = getMode() === 'live';

    setVisibility(document.querySelectorAll('[data-live-only]'), isLive);
    setVisibility(document.querySelectorAll('[data-prelaunch-only]'), !isLive);
    setVisibility(document.querySelectorAll('.secret-overlay'), !isLive);
    setVisibility(document.querySelectorAll('.product-real-img'), isLive);

    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.12 });
      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('visible'));
    }

    const form = document.querySelector('.waitlist-form');
    if (!form || isLive) return;

    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"], button');
    const status = document.querySelector('.waitlist-status');
    const endpoint = (form.dataset.endpoint || form.getAttribute('action') || '').trim();

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = (input && input.value || '').trim();
      if (!email) {
        setText(status, 'Enter your email first.', 'is-error');
        return;
      }

      if (endpoint && !endpoint.startsWith('mailto:')) {
        const original = button ? button.textContent : '';
        if (button) {
          button.disabled = true;
          button.textContent = 'Sending...';
        }
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'website-waitlist' })
          });
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          setText(status, 'You are on the waitlist.', 'is-success');
        } catch (err) {
          setText(status, 'Submission failed. Please email hello@marshabotanica.com.', 'is-error');
        } finally {
          if (button) {
            button.disabled = false;
            button.textContent = original || 'Notify Me';
          }
        }
        return;
      }

      const subject = encodeURIComponent('Marsha Botanica waitlist');
      const body = encodeURIComponent(`Please add this email to the waitlist:

${email}`);
      window.location.href = `mailto:hello@marshabotanica.com?subject=${subject}&body=${body}`;
      form.reset();
      setText(status, 'Your email app should open with a ready-to-send waitlist message.', 'is-success');
    });
  });
})();
