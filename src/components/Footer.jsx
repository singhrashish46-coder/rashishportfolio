import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      background: "var(--bg2)",
      padding: "40px 6%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 20,
    }}>
      <div>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--violet)" }}>{"<"}</span>
        <span style={{ fontWeight: 600 }}>Rashish</span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--violet)" }}>{" />"}</span>
        <p style={{ color: "var(--muted)", fontSize: "0.83rem", marginTop: 4 }}>
          AI & Automation Engineer · JEE Aspirant · 2026
        </p>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {[
          { icon: <FiGithub size={18} />, href: "https://github.com", label: "GitHub" },
          { icon: <FiLinkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
          { icon: <FiTwitter size={18} />, href: "https://twitter.com", label: "Twitter" },
          { icon: <FiMail size={18} />, href: "mailto:rashish@example.com", label: "Email" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "var(--muted)",
              transition: "color 0.2s, transform 0.2s",
              display: "flex",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--violet2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
