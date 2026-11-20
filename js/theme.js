// Переключает светлую и тёмную тему, сохраняет выбор и учитывает настройки устройства.
(() => {
  const key = 'forcats-theme';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice = null;
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') {
      choice = saved;
    }
  } catch {}
  function apply(theme) {
    root.dataset.theme = theme;
    const button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }
    const dark = theme === 'dark';
    button.textContent = dark ? '☀' : '☾';
    button.setAttribute(
      'aria-label',
      dark ? 'Включить светлую тему' : 'Включить тёмную тему'
    );
    button.title = dark ? 'Светлая тема' : 'Тёмная тема';
    button.setAttribute('aria-pressed', String(dark));
  }
  apply(choice || (system.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      choice = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(key, choice);
      } catch {}
      apply(choice);
    });
  });
  system.addEventListener('change', () => {
    if (!choice) {
      apply(system.matches ? 'dark' : 'light');
    }
  });
  // Синхронизируем тему с изменениями в других вкладках.
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) {
      return;
    }
    choice =
      event.newValue === 'dark' || event.newValue === 'light'
        ? event.newValue
        : null;
    apply(choice || (system.matches ? 'dark' : 'light'));
  });
})();
