import { ClipboardCheck, FileCheck, Search, Ship, Truck, Warehouse } from "lucide-react";
import Reveal, { Eyebrow } from "./Reveal";
import { services } from "../data";

const icons = [Search, Warehouse, ClipboardCheck, Ship, FileCheck, Truck];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="mb-12 max-w-[720px]">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-3.5 font-display text-[clamp(32px,4.4vw,52px)] leading-[1.12] font-bold tracking-[-0.02em]">
            One team from the factory floor to your front door.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Anyone can say they import from China. What you actually need is a smooth process, clear communication and a shipment that arrives safely.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={service.num} delay={index * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-[18px] border border-black/8 bg-white p-7 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[var(--shadow-lift)]">
                  <span className="absolute top-6 right-6 font-display text-[13px] font-bold text-zinc-300">{service.num}</span>
                  <div className="mb-5 grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-ink text-white transition group-hover:bg-accent">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{service.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
