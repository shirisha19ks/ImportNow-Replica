import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase ${
        light ? "text-white" : "text-accent"
      }`}
    >
      <span className={`h-[2px] w-[22px] rounded-full ${light ? "bg-white" : "bg-accent"}`} />
      {children}
    </p>
  );
}
