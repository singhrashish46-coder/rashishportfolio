import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiClock, FiZap, FiArchive, FiLoader } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading.jsx";

const statusMeta = {
  live:      { label: "Live",        color: "var(--green)",  icon: <FiZap size={11} /> },
  completed: { label: "Done",        color: "var(--cyan)",   icon: <FiClock size={11} /> },
  wip:       { label: "In Progress", color: "var(--amber)",  icon: <FiLoader size={11} /> },
  archived:  { label: "Archived",    color: "var(--muted)",  icon: <FiArchive size={11} /> },
};

const projects = [
  {
    id: 2,
    title: "Dating App",
    badge: "Full-Stack",
    description: "A real-world dating app I'm actively building and improving. Not on a daily schedule — JEE prep comes first — but it's growing spontaneously with new features whenever I get the time. Live and functional.",
    tech: ["React", "Node.js", "Express", "Railway", 'vercel', 'github', 'claudeai', 'python', 'claude', 'Reverse Engineering'],
    status: "wip",
    link: "https://datingapp-production-2362.up.railway.app/",
    made: "2025",
  },
  {
    id: 1,
    title: "SnakeEngine",
    badge: "EdTech",
    description: "Built for every student who felt lost drowning in coding tutorials and scattered resources .Since it's llms and apis are not working as made  years ago exactly where I was 2 years ago. SnakeEngine is a self-paced learning platform that lets people find structured, bite-sized coding paths so they actually make progress instead of just collecting bookmarks.",
    tech: ["React", "Node.js", "Vercel"],
    status: "live",
    link: "https://snakeengine.vercel.app",
    made: "2024",
  },
  
  {
    id: 7,
    title: "AI Stock Predictor",
    badge: "Deep Learning",
    description: "LSTM/RNN-based model that forecasts stock prices using historical data, sentiment analysis, and technical indicators. Includes a React dashboard with real-time charts.",
    tech: ["Python", "LSTM", "TensorFlow", "React", "Firebase"],
    status: "completed",
    link: "",
    made: "2024",
  },
  {
    id: 8,
    title: "n8n Automation Hub",
    badge: "Automation",
    description: "A collection of 20+ production-grade n8n workflows automating tasks like lead scraping, email campaigns, Discord bots, and CRM syncing.",
    tech: ["n8n", "Node.js", "REST APIs", "Webhooks"],
    status: "live",
    link: "",
    made: "2024",
  },
  {
    id: 3,
    title: "RAG Knowledge Base",
    badge: "GenAI",
    description: "Retrieval-Augmented Generation system using LangChain + HuggingFace embeddings, letting users query large document sets with accurate, cited answers.",
    tech: ["LangChain", "HuggingFace", "Python", "FAISS", "FastAPI"],
    status: "completed",
    link: "",
    made: "2025",
  },
  {
    id: 4,
    title: "Full-Stack SaaS Template",
    badge: "Web Dev",
    description: "Production-ready SaaS boilerplate with auth, subscription billing, dashboard, and role-based access. Built for rapid startup launches.",
    tech: ["React", "Node.js", "Express", "Firebase", "Stripe"],
    status: "live",
    link: "",
    made: "2024",
  },
  {
    id: 5,
    title: "Arduino Smart Home",
    badge: "Robotics",
    description: "IoT home automation system using Arduino + NodeMCU, controllable via a mobile app. Features motion detection, auto lighting, and temperature control.",
    tech: ["Arduino", "NodeMCU", "C++", "React Native", "MQTT"],
    status: "completed",
    link: "",
    made: "2023",
  },
  {
    id: 6,
    title: "Advanced Recommender",
    badge: "ML",
    description: "Hybrid recommendation engine combining collaborative filtering and content-based methods. Currently integrating deep learning layers for improved accuracy.",
    tech: ["Python", "Scikit-learn", "Pandas", "Flask", 'html', 'css', 'script'],
    status: "wip",
    link: "",
    made: "2025",
  },
  
  {
    id: 3,
    title: "Math for ML & AI — From Scratch",
    badge: "Mathematics",
    description: "The exact math you actually need to understand ML and Deep Learning — not just use it. Covers Linear Algebra (vectors, matrices, eigenvalues, SVD), Calculus (derivatives, chain rule, partial derivatives, gradients), Probability & Statistics (Bayes, distributions, MLE, entropy), and Optimization (gradient descent, convexity, Lagrange multipliers). All built with 11th–12th level intuition first, then extended to how it's used inside neural networks, backprop, attention, and more. No hand-waving — real understanding from ground up.",
    tech: ["Linear Algebra", "Calculus", "Probability", "Optimization", "Backprop Math"],
    status: "wip",
    link: "",
    made: "done in 2025 and still in learning process ",
  },

];

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: 100 }}>
      <div className="container">
        <SectionHeading label="// portfolio" title="Featured" accent="Projects" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
          {projects.map((p, i) => {
            const st = statusMeta[p.status] || statusMeta.completed;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  backdropFilter: "blur(12px)",
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                }}
                whileHover={{ scale: 1.015, borderColor: "rgba(139,92,246,0.45)", boxShadow: "0 8px 40px rgba(139,92,246,0.12)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{
                    background: "rgba(139,92,246,0.12)", color: "var(--violet2)",
                    border: "1px solid rgba(139,92,246,0.2)", padding: "3px 10px",
                    borderRadius: 6, fontSize: "0.72rem", fontWeight: 600, fontFamily: "var(--font-mono)",
                  }}>{p.badge}</span>

                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: st.color, fontSize: "0.72rem", fontWeight: 600 }}>
                      {st.icon} {st.label}
                    </span>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" style={{ color: "var(--muted)", transition: "color 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--violet2)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}
                      >
                        <FiExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 style={{ fontWeight: 700, fontSize: "1.15rem" }}>{p.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, flex: 1 }}>{p.description}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 6 }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--muted)", padding: "2px 9px", borderRadius: 5,
                      fontSize: "0.73rem", fontFamily: "var(--font-mono)",
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "var(--font-mono)", marginTop: 4 }}>
                  📅 {p.made}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: 60, padding: 40,
            border: "1px dashed var(--border)", borderRadius: "var(--radius)",
            textAlign: "center", color: "var(--muted)",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", marginBottom: 10 }}>// More projects coming soon</p>
          <p style={{ fontSize: "0.88rem" }}>Currently deep in JEE prep & building the Advanced Recommender system.</p>
        </motion.div>
      </div>
    </main>
  );
}
