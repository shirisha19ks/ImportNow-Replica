export default function Logo({ light = false, className = "" }) {
  return (
    <a
      href="#home"
      aria-label="ImportNow home"
      className={`inline-flex items-center font-display text-[22px] font-extrabold tracking-tight ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      IMP
      <span className="mx-[1px] inline-flex h-[0.78em] w-[0.78em] items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
          />
          <path
            d="M8 12h7.2M12.2 8.4 16.2 12l-4 3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      RTNOW
    </a>
  );
}
