import Globe from "../Globe";
import Button from "../Button";
import { NEWS } from "@/lib/content";

export default function Hero() {
  const ticker = [...NEWS, ...NEWS];
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white">
      <div className="absolute inset-x-0 top-[76px] z-20 overflow-hidden border-y border-white/10 py-2 sm:top-[84px]">
        <div className="marquee-track flex w-max gap-10 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap text-white/50 uppercase">
          {ticker.map((n, i) => (
            <span key={i}>News: {n}&nbsp;&nbsp;·</span>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-[-38vw] -z-10 aspect-square w-[110vw] -translate-y-[42%] sm:right-[-18vw] sm:w-[78vw] md:right-[-8vw] md:w-[62vw]">
        <div className="absolute inset-[3%] rounded-full shadow-[0_0_120px_20px_rgba(29,85,214,0.35),inset_0_0_80px_rgba(29,85,214,0.45)] ring-1 ring-[#2f6bff]/60" />
        <Globe className="absolute inset-0 h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pt-40 pb-24 sm:px-8 md:justify-center md:px-12 md:pb-0">
        <p className="font-mono text-[11px] tracking-[0.24em] text-white/60 uppercase">One operator</p>
        <h1 className="mt-4 text-[17vw] leading-[0.86] font-semibold tracking-[-0.055em] uppercase sm:text-[84px] md:text-[104px]">
          Every
          <br />
          leg of the
          <br />
          journey
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
          Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact">Talk with us</Button>
          <Button href="/services" variant="outline-light">Our services</Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl justify-between px-5 pb-5 font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase sm:px-8 md:px-12">
        <span>Australia · New Zealand · Hong Kong · China</span>
        <span className="hidden sm:block">Drag the globe</span>
      </div>
    </section>
  );
}
