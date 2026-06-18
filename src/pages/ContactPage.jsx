import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiLinkedin, FiGithub, FiCheckCircle } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading.jsx";

// ──────────────────────────────────────────────────────────────────────────────
// TO RECEIVE EMAILS: go to https://formspree.io → create free form → paste ID below
// e.g. "https://formspree.io/f/abcdefgh"
// If left as-is, the form opens the user's mail client as fallback.
const FORMSPREE_ID = ""; // ← paste your Formspree form ID here (e.g. "xpwzlkjr")
// ──────────────────────────────────────────────────────────────────────────────

const YOUR_EMAIL = "Rashishreshu@gmail.com";

const socials = [
  { icon: <FiMail />,     label: "Email",    value: YOUR_EMAIL,                   href: `mailto:${YOUR_EMAIL}` },
  { icon: <FiLinkedin />, label: "LinkedIn", value: "linkedin.com/in/rashish",    href: "https://linkedin.com/in/rashish" },
  { icon: <FiGithub />,   label: "GitHub",   value: "github.com/rashish",         href: "https://github.com/rashish" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields."); return; }
    setError("");

    // Formspree mode
    if (FORMSPREE_ID) {
      setLoading(true);
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) { setSent(true); setForm({ name: "", email: "", message: "" }); }
        else setError("Something went wrong. Please try again.");
      } catch { setError("Network error. Please try again."); }
      finally { setLoading(false); }
    } else {
      // Fallback: open mailto
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`);
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border)", borderRadius: 10,
    padding: "14px 16px", color: "var(--text)",
    fontFamily: "var(--font-sans)", fontSize: "0.92rem",
    outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <main style={{ paddingTop: 100 }}>
      <div className="container">
        <SectionHeading label="// get in touch" title="Let's" accent="Connect" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 40 }}>
              Whether you need an AI solution, automation workflow, or want to learn — I'm open to freelance work, collaborations, and tutoring. Don't hesitate to reach out.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "16px 20px", background: "var(--card-bg)",
                    border: "1px solid var(--border)", borderRadius: "var(--radius)",
                    backdropFilter: "blur(12px)", transition: "border-color 0.2s, transform 0.2s", color: "var(--text)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span style={{ color: "var(--violet2)", fontSize: "1.1rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: "0.88rem", fontFamily: "var(--font-mono)" }}>{s.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 36, backdropFilter: "blur(16px)" }}
          >
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "40px 20px" }}>
                <FiCheckCircle size={48} style={{ color: "var(--green)", marginBottom: 16 }} />
                <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: 24, padding: "10px 24px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer" }}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[{ label: "Name", name: "name", type: "text", ph: "Your name" }, { label: "Email", name: "email", type: "email", ph: "your@email.com" }].map(({ label, name, type, ph }) => (
                  <div key={name}>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>{label}</label>
                    <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={ph} style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "var(--violet)"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="What's on your mind?" rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--violet)"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }} />
                </div>
                {error && <p style={{ color: "var(--red)", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>{error}</p>}
                <button onClick={handleSubmit} disabled={loading}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: loading ? "rgba(139,92,246,0.4)" : "linear-gradient(135deg, var(--violet), #6366f1)",
                    color: "white", border: "none", padding: "14px", borderRadius: 10,
                    fontWeight: 600, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <FiSend size={16} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {!FORMSPREE_ID && (
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", textAlign: "center", fontFamily: "var(--font-mono)" }}>
                    // Opens your mail client
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
  );
}
