import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlobeVisual, { Flag } from "./GlobeVisual";
import { stats } from "../data";

const cards = [
  { title: "Factory QC passed", detail: "Photo report before the container is sealed", className: "left-[6%] top-[8%]" },
  { title: "In transit · day 18", detail: "Shanghai → Nhava Sheva, tracked live", className: "right-[2%] top-[18%]" },
  { title: "Door delivery", detail: "Unloaded at your shop, villa or warehouse", className: "bottom-[14%] left-[10%]" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(900px_700px_at_78%_48%,#ececee_0%,rgba(236,236,238,0)_65%),radial-gradient(700px_500px_at_5%_100%,rgba(227,36,27,0.05),transparent_60%),linear-gradient(180deg,#f6f6f7_0%,#fbfbfb_70%,#fff_100%)]">
      <div className="pointer-events-none absolute top-1/2 right-[-8%] z-0 w-[min(820px,92vw)] -translate-y-[46%] sm:right-[-4%] lg:w-[min(760px,54vw)]">
        <GlobeVisual />
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className={`absolute hidden w-[230px] rounded-2xl border border-black/8 bg-white/92 p-4 shadow-[var(--shadow-lift)] backdrop-blur-md xl:block ${card.className}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.4 + index * 0.15, duration: 0.6 },
              y: { delay: 1 + index * 0.2, duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <p className="font-display text-[15px] font-semibold tracking-tight">{card.title}</p>
            <p className="mt-1 text-[13px] leading-snug text-muted">{card.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] items-end px-4 pt-28 pb-16 sm:px-6 lg:items-center lg:pt-24 lg:pb-10">
        <div className="max-w-[640px] lg:max-w-[560px]">
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border border-black/8 bg-white/85 px-3 py-2 text-[13px] font-medium text-muted shadow-[var(--shadow-card)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flag code="cn" />
            <span className="text-accent">→</span>
            <Flag code="in" />
            Trusted by 500+ Indian businesses
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(42px,6.2vw,80px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
            <span className="block">Import directly</span>
            <span className="block">from China.</span>
            <span className="block text-accent">Without the</span>
            <span className="block text-accent">guesswork.</span>
          </h1>

          <p className="mt-5 max-w-[540px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-muted">
            Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in Shanghai. You choose the product. We bring it to your door.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-[15px] text-[15px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-accent"
            >
              Get a free sourcing quote
              <ArrowRight size={16} />
            </a>
            <a
              href="#journey"
              className="inline-flex items-center rounded-full border border-black/15 bg-white px-6 py-[15px] text-[15px] font-semibold text-ink shadow-[var(--shadow-card)] transition hover:border-ink"
            >
              See how it works
            </a>
          </div>

          <dl id="stats" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:max-w-[560px] lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-[28px] leading-none font-bold">{stat.value}</dt>
                <dd className="mt-2 text-[13px] leading-snug text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] text-dim uppercase lg:flex">
        Scroll
        <i className="scroll-line block h-9 w-px bg-linear-to-b from-ink to-transparent" />
      </div>
    </section>
  );
}
