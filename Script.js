<script>
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const themeText = document.getElementById('theme-text');
  const modes = ['auto', 'light', 'dark'];
  let mode = localStorage.getItem('theme') || 'auto';

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme() {
    const activeTheme = mode === 'auto' ? systemTheme() : mode;
    root.dataset.theme = activeTheme;
    themeText.textContent = `Theme: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    button.setAttribute('aria-pressed', mode !== 'auto');
  }

  button.addEventListener('click', () => {
    const index = modes.indexOf(mode);
    mode = modes[(index + 1) % modes.length];
    localStorage.setItem('theme', mode);
    applyTheme();
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (mode === 'auto') applyTheme();
  });

  applyTheme();
</script>