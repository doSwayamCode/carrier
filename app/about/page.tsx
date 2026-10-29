import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Statement from "@/components/home/Statement";
import Markets from "@/components/home/Markets";
import Reveal from "@/components/Reveal";
import ConsultForm from "@/components/ConsultForm";

export const metadata: Metadata = { title: "About" };

const VALUES = [
  { t: "One file", b: "Every shipment sits on a single file from quote to POD. No re-keying, no handoffs between vendors." },
  { t: "Own the outcome", b: "If something slips, it's ours to fix. We don't point at a carrier, a broker or a depot." },
  { t: "Show the work", b: "Live milestones, honest ETAs and costs you can trace line by line." },
  { t: "Local, everywhere", b: "Our people are on the ground in each market we operate — not just on a partner list." },
];

const GALLERY = ["/images/warehouse.jpg", "/images/aircraft.jpg", "/images/port.jpg", "/images/truck.jpg"];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Eliv" title={<>Built to carry<br />the whole load</>} body="An APAC freight operator that runs air, ocean, customs and road under one roof — so one team answers for your cargo from origin to door." image="/images/port.jpg" />
      <Statement />
      <section className="bg-[#0d0e12] px-5 py-24 text-white sm:px-8 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-5xl font-semibold tracking-[-0.045em] uppercase md:text-6xl">How we work</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/10 md:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 80} className="bg-[#0d0e12] p-7">
                <p className="font-mono text-[10px] text-white/40">0{i + 1}</p>
                <p className="mt-10 text-xl font-semibold tracking-tight uppercase">{v.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{v.b}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.map((g) => (
              <div key={g} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image src={g} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Markets />
      <ConsultForm />
    </>
  );
}
