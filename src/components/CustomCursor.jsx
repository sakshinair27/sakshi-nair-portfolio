import { useEffect, useRef } from "react";

const HOVER_SELECTOR = "a, button, input, textarea, select, [role='button'], .cursor-hover";

/**
 * A minimal ring-and-dot cursor that trails the pointer with a light lag,
 * and grows slightly over links/buttons. Only active on fine-pointer,
 * non-touch devices; otherwise renders nothing and leaves the native
 * cursor alone.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let started = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!started) {
        started = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      const target = e.target;
      const isHoverable = target instanceof Element && target.closest(HOVER_SELECTOR);
      if (isHoverable !== hovering) {
        hovering = !!isHoverable;
        ring.classList.toggle("custom-cursor-ring--hover", hovering);
      }
    };

    const onLeaveDoc = (e) => {
      if (e.relatedTarget || e.toElement) return;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    let raf;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onLeaveDoc);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeaveDoc);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
