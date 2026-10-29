import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { INSIGHTS } from "@/lib/content";

export default function Insights() {
  return (
    <section className="bg-black px-5 py-24 text-white sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
          <h2 className="text-5xl leading-[0.92] font-semibold tracking-[-0.045em] uppercase md:text-7xl">
            <span className="text-white/40">What&apos;s moving</span>
            <br />
            in your industry
          </h2>
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">Stay ahead of the shifts shaping trade across APAC — from regulatory changes to new shipping routes and supply chain trends.</p>
            <div className="mt-5"><Button href="/insights" variant="outline-light">View all</Button></div>
          </div>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <ul className="border-t border-white/10">
            {INSIGHTS.map((n) => (
              <li key={n.title}>
                <Link href="/insights" className="group grid gap-1 border-b border-white/10 py-5 md:grid-cols-[1fr_auto] md:gap-6">
                  <span>
                    <span className="block font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">{n.date}</span>
                    <span className="mt-1 block text-[15px] transition-colors group-hover:text-[var(--sand)]">{n.title}</span>
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase md:self-end">{n.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/insights" className="group relative block aspect-[4/3] overflow-hidden rounded-lg md:aspect-auto">
            <Image src="/images/cranes.jpg" alt="Container ship at a quay" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 text-sm">{INSIGHTS[0].title}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
