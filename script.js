/* Theme preference: saved visitor choice wins; first visit follows the device. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'kayla-portfolio-theme';

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (toggle) {
      const isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (themeColor) {
      themeColor.setAttribute('content', theme === 'dark' ? '#1d211e' : '#f8f6f1');
    }
  };

  applyTheme(savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : (preference.matches ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The toggle still works for this page view even if saving is blocked.
    }
  });

  // Keep the first-visit theme in sync with OS changes until a visitor chooses one.
  preference.addEventListener?.('change', (event) => {
    try {
      if (!localStorage.getItem(storageKey)) applyTheme(event.matches ? 'dark' : 'light');
    } catch {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
})();
