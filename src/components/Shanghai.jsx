import { Check } from "lucide-react";
import Reveal, { Eyebrow } from "./Reveal";
import { licenceChecks } from "../data";

export default function Shanghai() {
  return (
    <section id="inspection" className="border-y border-black bg-ink py-24 text-zinc-200 sm:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Officially in China</Eyebrow>
          <h2 className="mt-3.5 font-display text-[clamp(32px,4.4vw,52px)] leading-[1.12] font-bold tracking-[-0.02em] text-white">
            Many claim an office in China. We have the licence.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            ImportNow operates through its own registered company in Shanghai, Shanghai Shengqiao Chain Trading Co., Ltd. That means we can sign contracts with factories, pay suppliers locally and stand behind every order.
          </p>
          <ul className="mt-8 grid gap-4">
            {licenceChecks.map((item) => (
              <li key={item} className="flex gap-3.5 text-zinc-400">
                <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-accent text-white">
                  <Check size={14} />
                </span>
                <span>
                  <b className="font-semibold text-white">{item}</b>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <LicenceCard />
        </Reveal>
      </div>
    </section>
  );
}

function LicenceCard() {
  return (
    <div className="grid place-items-center [perspective:1400px]">
      <article className="relative aspect-[1/1.28] w-full max-w-[440px] rounded-md bg-[linear-gradient(160deg,#fffaf0,#f3e9d4)] p-7 text-[#4a3b22] shadow-[0_40px_80px_-24px_rgba(74,40,20,0.45),0_0_0_10px_#8b1d16,0_0_0_12px_#d4a94a] [transform:rotateY(-12deg)_rotateX(5deg)] max-sm:[transform:none]">
        <p className="text-center font-serif text-[26px] font-bold tracking-[0.28em] text-[#8b1d16]">营业执照</p>
        <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.28em] text-[#8b6a2e]">BUSINESS LICENCE</p>
        <div className="mx-auto mt-4 h-[62px] w-[62px] rounded-full bg-[radial-gradient(circle,#e6b84a_0_40%,#b8862a_41%_46%,transparent_47%),radial-gradient(circle,#c9302c_0_70%,transparent_71%)]" />
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-2 text-[12.5px]">
          {[
            ["Company", "Shanghai Shengqiao Chain Trading Co., Ltd."],
            ["Location", "Shanghai, People's Republic of China"],
            ["Scope", "Supply chain, sourcing & international trade"],
            ["Serving", "Importers across India"],
          ].map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="pt-0.5 text-[10.5px] font-semibold tracking-wider text-[#8b6a2e] uppercase">{label}</dt>
              <dd className="border-b border-dashed border-[#4a3b22]/30 pb-1.5">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="absolute bottom-7 left-7 h-[62px] w-[62px] border-4 border-[#4a3b22] opacity-75 [background:conic-gradient(from_90deg,#4a3b22_25%,transparent_0_50%,#4a3b22_0_75%,transparent_0)] [background-size:12px_12px]" />
        <div className="absolute right-6 bottom-7 grid h-[118px] w-[118px] -rotate-12 place-items-center rounded-full border-4 border-[rgba(200,30,30,0.82)] text-center text-[10px] font-bold tracking-wide text-[rgba(200,30,30,0.85)]">
          <span className="absolute top-6 text-[28px]">★</span>
          <span className="mt-8">
            SHANGHAI
            <br />
            SHENGQIAO
            <br />
            TRADING
          </span>
        </div>
      </article>
    </div>
  );
}
