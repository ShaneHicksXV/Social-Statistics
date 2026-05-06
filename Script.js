const root = document.documentElement;
const button = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const goalForm = document.getElementById('goal-form');
const goalInput = document.getElementById('goal-hours');
const goalDisplay = document.getElementById('goal-display');
const currentUse = document.getElementById('current-use');
const meterFill = document.getElementById('meter-fill');
const trackerStatus = document.getElementById('tracker-status');
const modes = ['auto', 'light', 'dark'];
let mode = localStorage.getItem('theme') || 'auto';
const savedGoal = localStorage.getItem('socialGoal');
let goalHours = savedGoal ? Number(savedGoal) : 2;
const usageHours = 1.5;

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme() {
  const activeTheme = mode === 'auto' ? systemTheme() : mode;
  root.dataset.theme = activeTheme;
  if (themeText) themeText.textContent = `Theme: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
  if (button) button.setAttribute('aria-pressed', mode !== 'auto');
}

function updateTracker() {
  if (!goalDisplay || !currentUse || !meterFill || !trackerStatus || !goalInput) return;
  goalDisplay.textContent = goalHours.toString();
  currentUse.textContent = usageHours.toString();
  goalInput.value = goalHours;
  const percent = goalHours > 0 ? Math.min((usageHours / goalHours) * 100, 100) : 100;
  meterFill.style.width = percent + '%';
  trackerStatus.textContent = usageHours <= goalHours ? 'You are on track today.' : 'You are over your goal today.';
}

if (button) {
  button.addEventListener('click', () => {
    mode = modes[(modes.indexOf(mode) + 1) % modes.length];
    localStorage.setItem('theme', mode);
    applyTheme();
  });
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handleChange = () => { if (mode === 'auto') applyTheme(); };
if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', handleChange); else mediaQuery.addListener(handleChange);

if (goalForm && goalInput) {
  goalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = Number(goalInput.value);
    if (!Number.isNaN(value)) {
      goalHours = Math.max(0, Math.min(24, value));
      localStorage.setItem('socialGoal', String(goalHours));
      updateTracker();
    }
  });
}

applyTheme();
updateTracker();