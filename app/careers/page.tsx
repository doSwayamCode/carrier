import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Careers" };

const ROLES = [
  { t: "Ocean Freight Coordinator", l: "Melbourne", k: "Full time" },
  { t: "Licensed Customs Broker", l: "Sydney", k: "Full time" },
  { t: "Linehaul Dispatcher", l: "Melbourne", k: "Full time" },
  { t: "Warehouse Team Lead", l: "Tullamarine", k: "Full time" },
  { t: "Business Development Manager", l: "Hong Kong", k: "Full time" },
  { t: "Graduate Logistics Analyst", l: "Melbourne", k: "Graduate" },
];

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title={<>Move the world with us</>} body="We hire people who like owning outcomes. Small teams, real responsibility, and a network that spans four markets." image="/images/team.jpg" />
      <section className="bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between border-b border-neutral-200 pb-6">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] uppercase md:text-5xl">Open roles</h2>
            <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase">{ROLES.length} positions</p>
          </div>
          <ul>
            {ROLES.map((r, i) => (
              <Reveal as="li" key={r.t} delay={i * 60}>
                <a href="mailto:careers@eliv.com.au" className="group grid gap-2 border-b border-neutral-200 py-6 md:grid-cols-[1fr_200px_160px_40px] md:items-center">
                  <span className="text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2">{r.t}</span>
                  <span className="text-sm text-neutral-500">{r.l}</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-neutral-500 uppercase">{r.k}</span>
                  <span className="hidden text-neutral-300 transition-all group-hover:-rotate-45 group-hover:text-black md:block">→</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
