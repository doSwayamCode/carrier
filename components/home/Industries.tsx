"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import { INDUSTRIES } from "@/lib/content";

export default function Industries() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[#0d0e12] px-5 py-24 text-white sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-white/50 uppercase">Industries</p>
          <ul className="mt-6 border-t border-white/10">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="flex w-full items-baseline gap-5 border-b border-white/10 py-4 text-left"
                >
                  <span className="font-mono text-[10px] text-white/40">0{i + 1}</span>
                  <span className={`text-3xl font-semibold tracking-[-0.03em] uppercase transition-all duration-500 md:text-5xl ${active === i ? "translate-x-2 text-white" : "text-white/30"}`}>{ind.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/industries">All industries</Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg md:sticky md:top-24 md:self-start">
          {INDUSTRIES.map((ind, i) => (
            <Image
              key={ind.name}
              src={ind.image}
              alt={ind.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase">{INDUSTRIES[active].name}</p>
            <p className="mt-2 max-w-sm text-sm text-white/85">{INDUSTRIES[active].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
