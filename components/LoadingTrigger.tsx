import { useEffect, useRef } from 'react';

interface LoadingTriggerProps {
  onTrigger: () => void;
  enabled: boolean;
}

export default function LoadingTrigger({ onTrigger, enabled }: LoadingTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled) {
          onTrigger();
        }
      },
      { threshold: 0.1 }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [onTrigger, enabled]);

  return <div ref={triggerRef} className="h-10" />;
}