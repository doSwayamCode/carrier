import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { INSIGHTS } from "@/lib/content";

export const metadata: Metadata = { title: "Insights" };

export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title={<>What&apos;s moving in your industry</>} body="Rates, regulation, routes and the shifts shaping trade across APAC." image="/images/ship.jpg" />
      <section className="bg-black px-5 py-20 text-white sm:px-8 md:px-12 md:py-28">
        <ul className="mx-auto max-w-7xl border-t border-white/10">
          {INSIGHTS.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 60}>
              <article className="grid gap-2 border-b border-white/10 py-7 md:grid-cols-[200px_1fr_160px] md:items-baseline">
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">{n.date}</span>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{n.title}</h2>
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase md:text-right">{n.tag}</span>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
