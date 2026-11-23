import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "services", "journey", "industries", "trips", "guides", "contact"];
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition ${
        scrolled || open
          ? "border-black/8 bg-white/85 shadow-[0_6px_24px_-18px_rgba(15,23,42,0.4)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-[14.5px] font-medium text-muted lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative py-1 transition hover:text-ink ${active === link.href ? "text-ink" : ""}`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-ink" />
              )}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-ink px-[18px] py-[11px] text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-accent lg:inline-flex"
        >
          Get a free quote
        </a>
        <button
          type="button"
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-black/15 bg-white text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mx-3 mb-3 flex flex-col gap-1 rounded-2xl border border-black/8 bg-white p-3 shadow-[var(--shadow-lift)] lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3.5 font-medium text-ink hover:bg-mist"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-1 rounded-full bg-ink px-4 py-3.5 text-center font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Get a free quote
          </a>
        </nav>
      )}
    </header>
  );
}
