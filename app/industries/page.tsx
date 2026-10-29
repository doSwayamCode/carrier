import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ConsultForm from "@/components/ConsultForm";
import { INDUSTRIES } from "@/lib/content";

export const metadata: Metadata = { title: "Industries" };

export default function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title={<>Freight that knows your sector</>} body="Specialist programs for the industries that keep APAC moving — each run by people who have done it before." image="/images/mining.jpg" />
      <section className="bg-[#0d0e12] px-5 py-20 text-white sm:px-8 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 90}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image src={ind.image} alt={ind.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-mono text-[10px] text-white/50">0{i + 1}</p>
                  <h2 className="mt-1 text-3xl font-semibold tracking-tight uppercase">{ind.name}</h2>
                  <p className="mt-2 max-w-xs text-sm text-white/75">{ind.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <ConsultForm />
    </>
  );
}
