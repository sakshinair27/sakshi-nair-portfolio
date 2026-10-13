import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + className to attach to an element so it fades/slides in
 * once when it scrolls into view. Falls back to always-visible if
 * IntersectionObserver isn't available.
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, className: `reveal ${visible ? "reveal-visible" : ""}` };
}
