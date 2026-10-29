import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import ConsultForm from "@/components/ConsultForm";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Everything your freight needs</>} body="From air to sea, from customs clearance to final delivery — one partner, one point of contact, and total visibility from origin to destination." image="/images/cranes.jpg" />
      <section className="bg-white px-5 py-20 sm:px-8 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl space-y-24 md:space-y-32">
          {SERVICES.map((s, i) => (
            <article id={s.slug} key={s.slug} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16">
              <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-lg ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={s.image} alt={s.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </Reveal>
              <Reveal delay={120}>
                <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-400">0{i + 1} / 0{SERVICES.length}</p>
                <h2 className="mt-4 text-4xl leading-[0.95] font-semibold tracking-[-0.04em] uppercase md:text-6xl">{s.title}</h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600">{s.body}</p>
                <div className="mt-8"><Button href="/contact" variant="outline-dark">Get a quote</Button></div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>
      <ConsultForm />
    </>
  );
}
