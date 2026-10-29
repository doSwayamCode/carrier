import Link from "next/link";
import { CONTACT, NAV } from "@/lib/content";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white px-5 pt-20 pb-10 text-neutral-900 sm:px-8 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.3fr_0.7fr_1fr_1.1fr]">
        <div>
          <p className="text-3xl font-semibold tracking-[-0.03em]">Eliv Logistics</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
            Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.
          </p>
          <p className="mt-10 font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase">Newsletter</p>
          <form className="mt-3 flex max-w-xs items-center rounded-full border border-neutral-200 p-1 pl-4" action="#" aria-label="Newsletter">
            <input type="email" required placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400" />
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white" aria-label="Subscribe">
              <Arrow />
            </button>
          </form>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase">Links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[{ href: "/", label: "Home" }, ...NAV].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-neutral-700 transition-colors hover:text-black">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase">Contact info</p>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            <li>{CONTACT.address}</li>
            <li>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-black">{CONTACT.phone}</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-black">{CONTACT.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-3xl font-semibold tracking-[-0.03em]">Book a call</p>
          <p className="mt-3 text-sm text-neutral-500">Still having questions? Request a call back.</p>
          <Link href="/contact" className="mt-5 flex max-w-xs items-center justify-between rounded-full border border-neutral-200 p-1 pl-4 text-sm text-neutral-400 transition-colors hover:border-neutral-400">
            Request a call
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"><Arrow /></span>
          </Link>
          <div className="mt-6 flex gap-2">
            {["in", "ig", "f"].map((s) => (
              <a key={s} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 font-mono text-[11px] text-neutral-600 transition-colors hover:bg-black hover:text-white" aria-label={s}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Eliv Logistics. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-black">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-black">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
