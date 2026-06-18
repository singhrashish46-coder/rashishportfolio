import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/courses", label: "Courses" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 6%",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,11,17,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.12)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text)" }}>
          <span style={{ color: "var(--violet)" }}>{"<"}</span>
          Rashish
          <span style={{ color: "var(--violet)" }}>{" />"}</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            style={({ isActive }) => ({
              fontSize: "0.9rem",
              fontWeight: 500,
              color: isActive ? "var(--violet2)" : "var(--muted)",
              transition: "color 0.2s",
              position: "relative",
            })}
          >
            {({ isActive }) => (
              <>
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: -4, left: 0, right: 0,
                      height: 2,
                      background: "var(--violet)",
                      borderRadius: 2,
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
        <Link
          to="/contact"
          style={{
            background: "linear-gradient(135deg, var(--violet), #6366f1)",
            color: "white",
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: "0.88rem",
            fontWeight: 600,
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          Contact me? ↗
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", color: "var(--text)", display: "none" }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        <div style={{ width: 24, height: 2, background: open ? "var(--violet)" : "var(--text)", marginBottom: 5, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
        <div style={{ width: 24, height: 2, background: "var(--text)", marginBottom: 5, opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
        <div style={{ width: 24, height: 2, background: open ? "var(--violet)" : "var(--text)", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: "68px", left: 0, right: 0,
              background: "rgba(8,11,17,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "30px 6%",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? "var(--violet2)" : "var(--text)",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
