import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SectionHeading({ label, title, accent }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: 56 }}
    >
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        color: "var(--violet)",
        letterSpacing: "2px",
        textTransform: "uppercase",
        display: "block",
        marginBottom: 10,
      }}>
        {label}
      </span>
      <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1 }}>
        {title}{" "}
        <span className="gradient-text">{accent}</span>
      </h2>
    </motion.div>
  );
}
