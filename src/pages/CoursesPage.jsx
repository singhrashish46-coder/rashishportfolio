import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiUpload, FiAward, FiX, FiImage, FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading.jsx";

// ── Static Courses Data ──────────────────────────────────────────────────────
const courses = [
  {
    id: 1, icon: "🤖",
    title: "Generative AI & LLMs",
    description: "Learn to build real-world GenAI apps using LangChain, HuggingFace, RAG pipelines, and prompt engineering techniques.",
    level: "Intermediate → Advanced",
  },
  {
    id: 2, icon: "🧠",
    title: "Deep Learning (LSTM/RNN)",
    description: "From fundamentals to production: time-series forecasting, NLP, and sequence modelling with TensorFlow/Keras.",
    level: "Intermediate",
  },
  {
    id: 3, icon: "⚡",
    title: "n8n Automation Mastery",
    description: "Build no-code/low-code automation workflows that save hours. REST APIs, webhooks, Discord bots, CRM pipelines and more.",
    level: "Beginner → Advanced",
  },
  {
    id: 4, icon: "🌐",
    title: "Full-Stack Development",
    description: "React, Node.js, Express, Firebase — end-to-end product development from wireframe to deployed SaaS.",
    level: "Beginner → Intermediate",
  },
];

// ── Hardcoded verified certificates (always shown, cannot be deleted) ────────
const VERIFIED_CERTS = [
  {
    id: "verified-1",
    name: "Complete Generative AI Course With Langchain and Huggingface",
    issuer: "Udemy · Krish Naik",
    year: "March 2026",
    imageUrl: "/certs/genai-langchain-huggingface.png",
    verifyUrl: "https://ude.my/UC-da3b8342-b54a-4de4-8151-de214b329ba0",
    hours: "57.5 hrs",
    verified: true,
  },
];

// ── localStorage helpers (for user-added certs) ──────────────────────────────
function getCerts() {
  try { return JSON.parse(localStorage.getItem("rashish_certs") || "[]"); }
  catch { return []; }
}
function saveCerts(certs) {
  localStorage.setItem("rashish_certs", JSON.stringify(certs));
}

// ── Verified Certificate Card ────────────────────────────────────────────────
function VerifiedCertCard({ cert, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ borderColor: "rgba(139,92,246,0.5)", y: -4 }}
      onClick={() => onClick(cert)}
      style={{
        background: "var(--card-bg)", border: "1px solid rgba(139,92,246,0.25)",
        borderRadius: "var(--radius)", overflow: "hidden",
        cursor: "pointer", transition: "border-color 0.2s, transform 0.2s", position: "relative",
      }}
    >
      {/* Verified badge */}
      <div style={{
        position: "absolute", top: 10, left: 10, zIndex: 2,
        background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)",
        borderRadius: 6, padding: "3px 9px",
        fontSize: "0.68rem", fontWeight: 700, color: "var(--green)",
        fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: 5,
      }}>
        ✓ Verified
      </div>

      <div style={{ width: "100%", aspectRatio: "16/9", background: "rgba(139,92,246,0.06)", overflow: "hidden" }}>
        <img src={cert.imageUrl} alt={cert.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        <p style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: 4, lineHeight: 1.3 }}>{cert.name}</p>
        <p style={{ fontSize: "0.74rem", color: "var(--muted)", fontFamily: "var(--font-mono)", marginBottom: 4 }}>{cert.issuer}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ fontSize: "0.7rem", color: "var(--violet2)", fontFamily: "var(--font-mono)" }}>{cert.year} · {cert.hours}</span>
          <a
            href={cert.verifyUrl} target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: "0.7rem", color: "var(--cyan)", fontFamily: "var(--font-mono)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Verify <FiExternalLink size={10} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── User Certificate Card ────────────────────────────────────────────────────
function CertCard({ cert, onDelete, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      whileHover={{ borderColor: "rgba(139,92,246,0.5)", y: -4 }}
      onClick={() => onClick(cert)}
      style={{
        background: "var(--card-bg)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", overflow: "hidden",
        cursor: "pointer", transition: "border-color 0.2s, transform 0.2s", position: "relative",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16/9", background: "rgba(139,92,246,0.06)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {cert.dataUrl ? (
          <img src={cert.dataUrl} alt={cert.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <FiAward size={48} style={{ color: "var(--violet)", opacity: 0.4 }} />
        )}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 2, lineHeight: 1.3 }}>{cert.name}</p>
            {cert.issuer && <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{cert.issuer}</p>}
            {cert.year && <p style={{ fontSize: "0.72rem", color: "var(--violet2)", marginTop: 4, fontFamily: "var(--font-mono)" }}>{cert.year}</p>}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(cert.id); }}
            style={{
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
              color: "var(--red)", borderRadius: 6, padding: "4px 7px", flexShrink: 0,
            }}
            title="Remove"
          >
            <FiX size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Upload Modal ────────────────────────────────────────────────────────────
function UploadModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");
  const [dataUrl, setDataUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setDataUrl(ev.target.result); setPreview(ev.target.result); };
    reader.readAsDataURL(file);
    if (!name) setName(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile({ target: { files: [e.dataTransfer.files[0]] } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg2)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", padding: "32px",
          width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Add Certificate</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--muted)", padding: 4 }}><FiX size={20} /></button>
        </div>

        <div
          onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileRef.current.click()}
          style={{
            border: "2px dashed rgba(139,92,246,0.3)", borderRadius: 10,
            padding: "28px 20px", textAlign: "center", cursor: "pointer",
            marginBottom: 20, background: "rgba(139,92,246,0.03)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)"; e.currentTarget.style.background = "rgba(139,92,246,0.07)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.background = "rgba(139,92,246,0.03)"; }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8 }} />
          ) : (
            <>
              <FiImage size={32} style={{ color: "var(--violet)", marginBottom: 10 }} />
              <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Drop certificate here or <span style={{ color: "var(--violet2)" }}>browse</span></p>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />

        {[
          { label: "Certificate Name *", val: name, set: setName, ph: "e.g. Machine Learning A-Z" },
          { label: "Issued by", val: issuer, set: setIssuer, ph: "e.g. Udemy, Coursera" },
          { label: "Year", val: year, set: setYear, ph: "e.g. 2025" },
        ].map(({ label, val, set, ph }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: "0.8rem", color: "var(--muted)", display: "block", marginBottom: 6, fontFamily: "var(--font-mono)" }}>{label}</label>
            <input
              value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
              style={{
                width: "100%", padding: "10px 14px",
                background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                borderRadius: 8, color: "var(--text)", fontSize: "0.88rem",
                fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--violet)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", fontWeight: 500 }}>Cancel</button>
          <button
            onClick={() => { if (!name.trim()) return; onSave({ id: Date.now(), name: name.trim(), issuer: issuer.trim(), year: year.trim(), dataUrl }); onClose(); }}
            disabled={!name.trim()}
            style={{
              flex: 2, padding: "10px", borderRadius: 8,
              background: name.trim() ? "linear-gradient(135deg, var(--violet), #6366f1)" : "rgba(139,92,246,0.2)",
              border: "none", color: name.trim() ? "white" : "var(--muted)",
              fontWeight: 600, cursor: name.trim() ? "pointer" : "not-allowed",
            }}
          >Save Certificate</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ cert, allCerts, onClose }) {
  const idx = allCerts.findIndex((c) => c.id === cert.id);
  const [current, setCurrent] = useState(idx >= 0 ? idx : 0);
  const c = allCerts[current];

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((i) => Math.min(i + 1, allCerts.length - 1));
      if (e.key === "ArrowLeft") setCurrent((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [allCerts.length, onClose]);

  const imgSrc = c.imageUrl || c.dataUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: 20,
      }}
    >
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.08)", border: "none", color: "white", borderRadius: 8, padding: "8px 12px" }}>
        <FiX />
      </button>
      <motion.div
        key={c.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "min(90vw, 800px)", width: "100%", textAlign: "center" }}
      >
        {imgSrc ? (
          <img src={imgSrc} alt={c.name} style={{ width: "100%", borderRadius: 12, boxShadow: "0 0 60px rgba(139,92,246,0.3)" }} />
        ) : (
          <div style={{ padding: 80, background: "rgba(139,92,246,0.08)", borderRadius: 12, border: "1px solid var(--border)" }}>
            <FiAward size={64} style={{ color: "var(--violet)", opacity: 0.5 }} />
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "white" }}>{c.name}</p>
          {c.issuer && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: 4 }}>{c.issuer} {c.year && `· ${c.year}`}</p>}
          {c.verifyUrl && (
            <a href={c.verifyUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, color: "var(--cyan)", fontSize: "0.82rem" }}>
              Verify on Udemy <FiExternalLink size={12} />
            </a>
          )}
        </div>
      </motion.div>

      {allCerts.length > 1 && (
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={(e) => { e.stopPropagation(); setCurrent((i) => Math.max(i - 1, 0)); }} disabled={current === 0}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: 8, padding: "10px 16px", opacity: current === 0 ? 0.3 : 1 }}>
            <FiChevronLeft />
          </button>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", alignSelf: "center" }}>{current + 1} / {allCerts.length}</span>
          <button onClick={(e) => { e.stopPropagation(); setCurrent((i) => Math.min(i + 1, allCerts.length - 1)); }} disabled={current === allCerts.length - 1}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: 8, padding: "10px 16px", opacity: current === allCerts.length - 1 ? 0.3 : 1 }}>
            <FiChevronRight />
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [userCerts, setUserCerts] = useState(getCerts);
  const [showUpload, setShowUpload] = useState(false);
  const [lightboxCert, setLightboxCert] = useState(null);

  // All certs for lightbox navigation: verified first, then user-added
  const allCerts = [...VERIFIED_CERTS, ...userCerts];

  const addCert = (cert) => {
    const updated = [cert, ...userCerts];
    setUserCerts(updated);
    saveCerts(updated);
  };

  const deleteCert = (id) => {
    const updated = userCerts.filter((c) => c.id !== id);
    setUserCerts(updated);
    saveCerts(updated);
  };

  return (
    <main style={{ paddingTop: 100 }}>
      <div className="container">
        <SectionHeading label="// teach & learn" title="Guidance &" accent="Courses" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24, marginBottom: 60 }}>
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.015, borderColor: "rgba(139,92,246,0.4)" }}
              style={{
                background: "var(--card-bg)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: 32,
                backdropFilter: "blur(12px)", transition: "border-color 0.2s",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 16 }}>{c.description}</p>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--cyan)",
                background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)",
                padding: "3px 10px", borderRadius: 6,
              }}>{c.level}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            marginBottom: 80,
            background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(99,102,241,0.1))",
            border: "1px solid var(--border)", borderRadius: "var(--radius)",
            padding: "36px 40px", display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 24,
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>Want to learn from me?</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Drop me a message and we'll figure out how I can help you level up.</p>
          </div>
          <Link to="/contact" style={{ background: "linear-gradient(135deg, var(--violet), #6366f1)", color: "white", padding: "13px 28px", borderRadius: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
            Get in Touch →
          </Link>
        </motion.div>

        {/* Certificates */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--violet)", letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>// credentials</span>
              <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700 }}>
                My <span style={{ background: "linear-gradient(135deg, var(--violet2), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Certificates</span>
              </h2>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, var(--violet), #6366f1)",
                color: "white", border: "none", padding: "10px 20px",
                borderRadius: 10, fontWeight: 600, fontSize: "0.88rem", cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <FiUpload size={15} /> Add Certificate
            </button>
          </div>

          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
            {/* Verified certs always first */}
            {VERIFIED_CERTS.map((cert) => (
              <VerifiedCertCard key={cert.id} cert={cert} onClick={setLightboxCert} />
            ))}
            {/* User-added certs */}
            <AnimatePresence>
              {userCerts.map((cert) => (
                <CertCard key={cert.id} cert={cert} onDelete={deleteCert} onClick={setLightboxCert} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} onSave={addCert} />}
      </AnimatePresence>
      <AnimatePresence>
        {lightboxCert && <Lightbox cert={lightboxCert} allCerts={allCerts} onClose={() => setLightboxCert(null)} />}
      </AnimatePresence>
    </main>
  );
}
