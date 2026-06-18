 import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDownload, FiFolder, FiExternalLink } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import rashishImg from "../assets/Rashish.png";

const skills = [
  { name: "Backend (Node.js · Express · REST APIs · Python)", level: 95, color: "var(--cyan)" },
  { name: "Web Development (React · Next.js · HTML/CSS/JS)", level: 87, color: "var(--violet)" },
  { name: "Python & Deep Learning (LSTM / RNN)", level: 90, color: "var(--violet2)" },
  { name: "n8n Automation & Workflows", level: 85, color: "var(--green)" },
  { name: "Firebase & Database Integration", level: 78, color: "var(--amber)" },
  { name: "Arduino / Robotics", level: 60, color: "var(--red)" },
];

const stats = [
  { value: "2+", label: "Years Coding" },
  { value: "10+", label: "Projects Built" },
  { value: "17", label: "Years Old" },
  { value: "JEE", label: "2026 Aspirant" },
];

const DRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/1oL5V6_aPhDHERAtxESInwhoHD8i8I7ut?usp=drive_link";

function SkillBar({ name, level, color, i }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: "0.82rem", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 10 }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [archiveRef, archiveInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main>
      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 6% 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow orb */}
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 40, flexWrap: "wrap" }}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ flex: "1 1 320px", maxWidth: 620 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 24,
            }}>
              <span style={{ width: 8, height: 8, background: "var(--green)", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--violet2)" }}>
                Open to Opportunities
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(2.4rem,7vw,5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: 16 }}>
              Hi, I'm <span className="gradient-text">Rashish</span>
            </h1>

            <div style={{ fontSize: "clamp(1rem,3vw,1.5rem)", color: "var(--muted)", marginBottom: 24, minHeight: 40 }}>
              <TypeAnimation
                sequence={[
                  "AI & Automation Engineer", 2000,
                  "Deep Learning Developer", 2000,
                  "Full-Stack Builder", 2000,
                  "JEE 2026 Aspirant", 2000,
                ]}
                speed={50}
                repeat={Infinity}
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>

            <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: 500, lineHeight: 1.75, marginBottom: 36 }}>
              17-year-old developer with 2+ years of hands-on experience in Deep Learning (LSTMs, RNNs) and Full-Stack development. Built <strong style={{ color: "var(--violet2)" }}>10+ fully advanced projects</strong> throughout my journey — from production-level apps to AI systems — while crushing PCM for JEE Advanced.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/projects" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, var(--violet), #6366f1)",
                color: "white", padding: "13px 28px", borderRadius: 10,
                fontWeight: 600, fontSize: "0.95rem",
                transition: "opacity 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                View Projects <FiArrowRight />
              </Link>
              <a href="/resume.pdf" download style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid var(--border)", color: "var(--text)",
                padding: "13px 28px", borderRadius: 10,
                fontWeight: 500, fontSize: "0.95rem",
                transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--violet)"; e.currentTarget.style.background = "rgba(139,92,246,0.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}
              >
                Resume <FiDownload />
              </a>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            style={{ flex: "0 0 auto" }}
          >
            <div style={{
              width: "clamp(200px,28vw,300px)",
              height: "clamp(200px,28vw,300px)",
              borderRadius: 30,
              background: "linear-gradient(135deg, var(--violet), #6366f1)",
              padding: 3,
              boxShadow: "0 0 60px rgba(139,92,246,0.25)",
            }}>
              <img
                src={rashishImg}
                alt="Rashish"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 27 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 30, textAlign: "center" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--violet2)" }}>{s.value}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 56 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--violet)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Expertise</span>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700 }}>Tech <span className="gradient-text">Stack</span></h2>
          </motion.div>
          <div style={{ maxWidth: 700 }}>
            {skills.map((s, i) => <SkillBar key={s.name} {...s} i={i} />)}
          </div>
        </div>
      </section>

      {/* PROJECT ARCHIVE — GOOGLE DRIVE */}
      <section style={{ padding: "100px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <motion.div
            ref={archiveRef}
            initial={{ opacity: 0, y: 30 }}
            animate={archiveInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 24,
              border: "1px solid var(--border)",
              background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(99,102,241,0.04))",
              padding: "56px 6%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div style={{
              position: "absolute", bottom: "-20%", left: "-5%",
              width: 360, height: 360,
              background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ flex: "1 1 380px", position: "relative" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--violet)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                Project Archive
              </span>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}>
                100+  &amp; medium/medium large projects, <span className="gradient-text">all in one Drive</span>
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: 520, lineHeight: 1.75 }}>
                Beyond the featured builds on this site, I keep a running archive of every experiment, AI script, and side project I've shipped — source code included. Browse the full collection on Google Drive.
              </p>
            </div>

            <motion.a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: "0 0 auto",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(135deg, var(--violet), #6366f1)",
                color: "white",
                padding: "16px 32px",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 8px 30px rgba(139,92,246,0.3)",
              }}
            >
              <FiFolder size={18} />
              Browse All Projects
              <FiExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </main>
  );
}
