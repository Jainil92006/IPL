document.addEventListener('DOMContentLoaded', () => {
  // Active nav highlighting
  try {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav a').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href === current) {
        link.classList.add('underline');
      } else {
        link.classList.remove('underline');
      }
    });
  } catch (_) {}

  // Scroll reveal observer
  let revealObserver;
  try {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    // Auto-tag common card containers if they don't already have reveal
    document.querySelectorAll('.rounded-lg, section').forEach(el => {
      if (!el.classList.contains('reveal') && !el.closest('header')) {
        el.classList.add('reveal');
      }
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } catch (_) {}

  // Loading overlay (optional, only if present)
  window.addEventListener('load', () => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      setTimeout(() => overlay.classList.add('hidden'), 500);
    }
  });
});


