import Image from "next/image";
import Counter from "../Counter";
import FillText from "../FillText";
import Reveal from "../Reveal";
import Button from "../Button";
import { STATS } from "@/lib/content";

/** "We move freight" — copy left, stats right; leads into the journey film. */
export default function Statement() {
  return (
    <section className="bg-white px-5 py-28 sm:px-8 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <div className="relative h-28 w-44 overflow-hidden rounded-md">
              <Image src="/images/road.jpg" alt="Truck on a mountain highway" fill sizes="176px" className="object-cover" />
            </div>
          </Reveal>
          <h2 className="mt-8 text-5xl leading-[0.92] font-semibold tracking-[-0.045em] uppercase md:text-[76px]">
            <FillText>We move freight.</FillText>
            <br />
            <FillText from="#c9d5f5" to="#1d55d6">We own the outcome.</FillText>
          </h2>
        </div>
        <div className="md:pt-40">
          <Reveal>
            <p className="max-w-md text-[17px] leading-relaxed text-neutral-800">
              With every service under one roof and one accountable team, your supply chain moves the way your business demands: predictably, transparently, and without excuses.
            </p>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-neutral-500">
              That means no finger-pointing between vendors. No delays lost in handoffs. Just one team, accountable from origin to destination.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline-dark">Learn more about us</Button>
            </div>
          </Reveal>
          <p className="mt-20 border-b border-neutral-200 pb-3 text-xs text-neutral-500">From countless journeys, clarity emerges</p>
          <ul>
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 90} className="border-b border-neutral-200 py-8">
                <p className="text-6xl font-semibold tracking-[-0.05em] md:text-[84px] md:leading-none">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-neutral-600">{s.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
