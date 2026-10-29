"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import RollText from "./RollText";
import { NAV } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  // tuck the bar away while scrolling down, bring it back on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:px-6 sm:pt-4 ${
        hidden && !open ? "-translate-y-[120%]" : ""
      }`}
    >
      <div className="pointer-events-auto relative w-full max-w-6xl">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full border border-white/10 bg-[#14161e]/65 px-1.5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <Link href="/" className="flex h-11 shrink-0 items-center rounded-full bg-white/0 pr-3 pl-1.5" aria-label="Eliv Logistics home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`group font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${pathname === n.href ? "text-white" : "text-white/70 hover:text-white"}`}
              >
                <RollText text={n.label} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden h-11 items-center rounded-full bg-[var(--sand)] px-5 font-mono text-[11px] font-semibold tracking-[0.16em] text-black uppercase transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <RollText text="Get a quote" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-[64px] origin-top rounded-3xl border border-white/10 bg-[#14161e]/95 p-6 text-white backdrop-blur-xl transition-all duration-500 md:hidden ${
            open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {[{ href: "/", label: "Home" }, ...NAV].map((n) => (
              <Link key={n.href} href={n.href} className="border-b border-white/10 py-3 text-2xl font-semibold tracking-tight">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--sand)] font-mono text-xs font-semibold tracking-[0.16em] text-black uppercase">
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
