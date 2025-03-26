import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  callback: () => void,
  enabled: boolean = true
) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observerRef.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, enabled]);

  return observerRef;
}