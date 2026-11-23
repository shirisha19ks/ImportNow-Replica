import { Armchair, Cpu, Lamp, ShoppingBasket, Cog, Zap } from "lucide-react";
import Reveal, { Eyebrow } from "./Reveal";
import { industries } from "../data";

const icons = [Armchair, Cpu, Zap, Lamp, ShoppingBasket, Cog];

export default function Industries() {
  return (
    <section id="industries" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="mb-12 max-w-[760px]">
          <Eyebrow>What we import</Eyebrow>
          <h2 className="mt-3.5 font-display text-[clamp(32px,4.4vw,52px)] leading-[1.12] font-bold tracking-[-0.02em]">
            China has a market for every industry. We know each one.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Each industry has its own manufacturing hub. We take you straight to the source — including lighting, supermarket goods, and machinery and automation.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.title} delay={(index % 3) * 0.06}>
                <article className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[18px] border border-black/8 bg-white p-7 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <Icon className="absolute -top-6 -right-4 h-36 w-36 text-ink opacity-[0.06]" />
                  <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500 uppercase">{item.hub}</p>
                  <h3 className="mt-3 font-display text-[22px] font-semibold tracking-tight">{item.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2 text-[14.5px] text-muted">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto inline-flex self-start rounded-[10px] border border-black/10 bg-mist px-3 py-2 text-[13px] leading-snug font-semibold">
                    {item.tag}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
