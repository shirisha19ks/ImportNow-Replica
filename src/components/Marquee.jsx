import { routes } from "../data";

export default function Marquee() {
  const items = [...routes, ...routes];
  return (
    <div className="overflow-hidden border-y border-black/8 bg-white py-5">
      <div className="marquee-track flex w-max gap-11">
        {items.map(([from, to], index) => (
          <span key={`${from}-${to}-${index}`} className="inline-flex items-center gap-3 font-display text-[15px] font-semibold text-zinc-800">
            {from}
            <em className="text-accent not-italic">→</em>
            {to}
          </span>
        ))}
      </div>
    </div>
  );
}
