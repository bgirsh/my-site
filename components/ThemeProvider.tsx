'use client';

import { useEffect } from 'react';

export default function ThemeProvider() {
  useEffect(() => {
    const root = document.documentElement;

    const storedTheme = localStorage.getItem('delinte-theme');

    if (storedTheme === 'light' || storedTheme === 'dark') {
      root.setAttribute('data-theme', storedTheme);
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('[data-theme-toggle]')) {
        return;
      }

      const next =
        root.getAttribute('data-theme') === 'light'
          ? 'dark'
          : 'light';

      root.setAttribute('data-theme', next);
      localStorage.setItem('delinte-theme', next);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}