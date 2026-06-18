import { useState, useEffect } from "react";

export function useInView(threshold = 0.15) {
  const [node, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);
  
  return { ref: setRef as any, inView };
}
