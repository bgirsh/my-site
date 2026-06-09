'use client';

import { useEffect } from 'react';

export default function HomeClient() {
  useEffect(() => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el: Element) => {
      const htmlEl = el as HTMLElement;

      const from = Number(htmlEl.dataset.from || 0);
      const to = Number(htmlEl.dataset.to || 0);
      const duration = Number(htmlEl.dataset.duration || 1200);
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const value = from + (to - from) * easeOutCubic(t);

        htmlEl.textContent = Math.round(value).toLocaleString();

        if (t < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const counters = entry.target.querySelectorAll('[data-counter]');

          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');

            counters.forEach((counter) => {
              animateCounter(counter);
            });
          } else {
            entry.target.classList.remove('is-revealed');

            counters.forEach((counter) => {
              const htmlCounter = counter as HTMLElement;
              htmlCounter.textContent = htmlCounter.dataset.from || '0';
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      io.observe(el);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return null;
}