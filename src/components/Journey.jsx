import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Ship } from "lucide-react";
import { Eyebrow } from "./Reveal";
import { journeySteps } from "../data";

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const shipX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const day = useTransform(scrollYProgress, [0, 1], [1, 36]);
  const active = useTransform(scrollYProgress, [0, 1], [0, journeySteps.length - 0.001]);

  return (
    <section id="journey" ref={ref} className="relative h-[320vh] bg-[#dfe3e8] sm:h-[380vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <PortScene progress={scrollYProgress} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/80 via-white/30 to-transparent max-lg:bg-linear-to-b max-lg:from-white/85 max-lg:via-transparent max-lg:to-white/50" />
        <div className="relative z-10 flex h-full flex-col px-4 pt-24 pb-5 sm:px-6">
          <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col">
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-3 max-w-[460px] font-display text-[clamp(28px,3.4vw,44px)] leading-[1.12] font-bold tracking-[-0.02em]">
                Watch your order travel from China to India.
              </h2>
            </div>

            <ol className="mt-6 flex max-w-[430px] flex-col gap-1 max-lg:mt-auto max-lg:mb-3">
              {journeySteps.map((step, index) => (
                <Step key={step.title} step={step} index={index} active={active} />
              ))}
            </ol>

            <div className="mt-auto flex max-w-[680px] items-center gap-3 rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur-md sm:gap-4 sm:px-5 sm:py-4">
              <div className="hidden text-[13px] leading-tight font-semibold sm:block">
                Shanghai
                <small className="block font-medium text-dim">Origin</small>
              </div>
              <div className="relative h-1 flex-1 rounded-full bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.2)_0_6px,transparent_6px_12px)]">
                <motion.div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: fill }} />
                <motion.div
                  className="absolute top-1/2 grid h-[30px] w-[30px] -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_0_0_4px_rgba(227,36,27,0.2),0_6px_16px_rgba(0,0,0,0.3)]"
                  style={{ left: shipX, x: "-50%" }}
                >
                  <Ship size={16} />
                </motion.div>
              </div>
              <div className="hidden text-right text-[13px] leading-tight font-semibold sm:block">
                Your door
                <small className="block font-medium text-dim">India</small>
              </div>
              <motion.span className="min-w-14 text-right font-display text-[13px] font-bold">
                <DayLabel value={day} />
              </motion.span>
            </div>
          </div>
        </div>
        <div className="absolute top-24 right-6 hidden items-center gap-2 rounded-full bg-white/90 px-3.5 py-2.5 text-xs font-semibold shadow-[var(--shadow-card)] lg:flex">
          <i className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          Shipment live
        </div>
      </div>
    </section>
  );
}

function DayLabel({ value }) {
  return (
    <motion.span>
      {value.get ? <DayReader value={value} /> : "Day 1"}
    </motion.span>
  );
}

function DayReader({ value }) {
  return <motion.span>{useDay(value)}</motion.span>;
}

function useDay(motionValue) {
  const rounded = useTransform(motionValue, (current) => `Day ${Math.max(1, Math.round(current))}`);
  return <motion.span>{rounded}</motion.span>;
}

function Step({ step, index, active }) {
  const state = useTransform(active, (current) => {
    if (current >= index && current < index + 1) return "on";
    if (current > index) return "done";
    return "idle";
  });

  return (
    <motion.li
      className="grid grid-cols-[40px_1fr] gap-3.5 rounded-[14px] border border-transparent px-4 py-3 max-lg:hidden"
      style={{
        opacity: useTransform(state, (value) => (value === "idle" ? 0.55 : 1)),
        backgroundColor: useTransform(state, (value) =>
          value === "on" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)"
        ),
        boxShadow: useTransform(state, (value) =>
          value === "on" ? "0 24px 50px -28px rgba(0,0,0,0.45)" : "0 0 0 rgba(0,0,0,0)"
        ),
      }}
    >
      <motion.span
        className="grid h-9 w-9 place-items-center rounded-full border border-black/15 bg-white/80 font-display text-[13px] font-bold"
        style={{
          backgroundColor: useTransform(state, (value) => (value === "on" ? "#e3241b" : "rgba(255,255,255,0.8)")),
          color: useTransform(state, (value) => (value === "on" ? "#fff" : "#0a0a0a")),
          borderColor: useTransform(state, (value) => (value === "on" ? "transparent" : "rgba(0,0,0,0.15)")),
        }}
      >
        {index + 1}
      </motion.span>
      <div>
        <h3 className="font-display text-base font-semibold">{step.title}</h3>
        <motion.p
          className="overflow-hidden text-sm text-muted"
          style={{
            maxHeight: useTransform(state, (value) => (value === "on" ? 90 : 0)),
            marginTop: useTransform(state, (value) => (value === "on" ? 6 : 0)),
          }}
        >
          {step.text}
        </motion.p>
      </div>
    </motion.li>
  );
}

function PortScene({ progress }) {
  const craneX = useTransform(progress, [0, 0.45, 1], [0, -30, -80]);
  const shipX = useTransform(progress, [0, 1], [40, -220]);
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#e7edf2_0%,#c5d0da_42%,#9eb0c0_42%,#7f97ab_100%)]">
      <div className="absolute top-[18%] right-[8%] h-24 w-40 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute top-[28%] right-[22%] h-16 w-28 rounded-full bg-white/40 blur-xl" />
      <motion.div style={{ x: craneX }} className="absolute top-[16%] right-[6%] hidden h-[46%] w-[46%] md:block">
        <Crane />
      </motion.div>
      <div className="absolute right-[18%] bottom-[34%] hidden gap-1.5 md:flex">
        {["#e3241b", "#f5c542", "#3b82f6", "#22c55e", "#0a0a0a", "#fb7185"].map((color, index) => (
          <span key={color} className="h-10 w-7 rounded-[3px] shadow-sm" style={{ background: color, opacity: 0.9 - index * 0.04 }} />
        ))}
      </div>
      <motion.div style={{ x: shipX }} className="absolute right-[4%] bottom-[18%] w-[min(640px,78vw)]">
        <ContainerShip />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,rgba(120,150,170,0.2),rgba(90,120,140,0.45))]" />
    </div>
  );
}

function Crane() {
  return (
    <svg viewBox="0 0 420 260" className="h-full w-full" aria-hidden="true">
      <rect x="40" y="150" width="18" height="100" fill="#c5161a" />
      <rect x="250" y="150" width="18" height="100" fill="#c5161a" />
      <polygon points="20,150 300,150 280,118 40,118" fill="#e3241b" />
      <rect x="70" y="96" width="250" height="22" rx="2" fill="#b91c1c" />
      <rect x="188" y="118" width="6" height="70" fill="#27272a" />
      <rect x="168" y="182" width="48" height="28" rx="2" fill="#f59e0b" />
    </svg>
  );
}

function ContainerShip() {
  return (
    <svg viewBox="0 0 640 220" className="w-full drop-shadow-xl" aria-hidden="true">
      <path d="M30 120 H520 L560 160 H70 Z" fill="#1f2937" />
      <path d="M70 160 H600 L570 190 H40 Z" fill="#111827" />
      <rect x="90" y="78" width="46" height="42" fill="#e3241b" />
      <rect x="140" y="78" width="46" height="42" fill="#2563eb" />
      <rect x="190" y="78" width="46" height="42" fill="#f59e0b" />
      <rect x="240" y="78" width="46" height="42" fill="#16a34a" />
      <rect x="290" y="78" width="46" height="42" fill="#0a0a0a" />
      <rect x="340" y="78" width="46" height="42" fill="#fb7185" />
      <rect x="90" y="40" width="46" height="36" fill="#3b82f6" />
      <rect x="140" y="40" width="46" height="36" fill="#e3241b" />
      <rect x="190" y="40" width="46" height="36" fill="#facc15" />
      <rect x="430" y="70" width="78" height="50" rx="4" fill="#f4f4f5" />
      <text x="448" y="100" fill="#0a0a0a" fontSize="11" fontFamily="Sora, sans-serif" fontWeight="700">
        IMPORTNOW
      </text>
      <circle cx="150" cy="176" r="8" fill="#d4d4d8" />
      <circle cx="190" cy="176" r="8" fill="#d4d4d8" />
      <circle cx="230" cy="176" r="8" fill="#d4d4d8" />
    </svg>
  );
}
