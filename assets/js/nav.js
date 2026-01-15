(() => {
  document.documentElement.classList.add('js');

  const navs = document.querySelectorAll('.site-nav');

  navs.forEach((nav) => {
    const toggle = nav.querySelector('.site-nav__toggle');
    const panel = nav.querySelector('.site-nav__panel');

    if (!toggle || !panel) return;

    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const open = () => {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    // Default state
    close();

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      if (isOpen) close();
      else open();
    });

    // Close when a menu link is clicked
    panel.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) close();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) close();
    });

    // If viewport gets larger, ensure menu is closed (panel becomes visible via CSS anyway)
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 721px)').matches) {
        close();
      }
    });
  });
})();
