import Image from "next/image";
import Reveal from "../Reveal";
import { MARKETS } from "@/lib/content";

/** Four markets: hover (or focus) widens a card, like an accordion. */
export default function Markets() {
  return (
    <section className="bg-[#0d0e12] px-5 py-24 text-white sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.24em] text-white/50 uppercase">Where we run</p>
            <h2 className="mt-4 text-5xl leading-[0.92] font-semibold tracking-[-0.045em] uppercase md:text-7xl">
              Four markets.
              <br />
              One file.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Australia, New Zealand, Hong Kong, and China. The lanes are ones we actually operate, not a map of places we mention.
          </p>
        </div>
        <Reveal className="group/list mt-14 flex flex-col gap-3 md:h-[480px] md:flex-row">
          {MARKETS.map((m, i) => (
            <article
              key={m.name}
              tabIndex={0}
              className={`group relative h-64 overflow-hidden rounded-lg outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] md:h-auto ${i === 0 ? "md:flex-[2.6] md:group-hover/list:flex-[1]" : "md:flex-[1]"} md:hover:!flex-[2.6] md:focus:!flex-[2.6]`}
            >
              <Image src={m.image} alt={m.name} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/60">0{i + 1}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight uppercase md:text-3xl">{m.name}</h3>
                <p className={`mt-2 max-w-xs text-xs leading-relaxed text-white/75 transition-opacity duration-500 md:opacity-0 md:group-hover:!opacity-100 md:group-focus:!opacity-100 ${i === 0 ? "md:opacity-100 md:group-hover/list:opacity-0" : ""}`}>{m.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
