import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + "px";
        ring.current.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hide on touch devices
  const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  if (isTouch) return null;

  return (
    <>
      <div ref={dot} style={{
        position: "fixed",
        width: 8,
        height: 8,
        background: "var(--violet)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%,-50%)",
        transition: "left 0.05s, top 0.05s",
      }} />
      <div ref={ring} style={{
        position: "fixed",
        width: 32,
        height: 32,
        border: "1.5px solid rgba(139,92,246,0.5)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9998,
        transform: "translate(-50%,-50%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }} />
    </>
  );
}
