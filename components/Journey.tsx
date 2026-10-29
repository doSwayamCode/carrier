"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_COPY = [
  {
    key: "yard",
    eyebrow: "01 — The yard",
    title: "Picked with precision.",
    body: "Every box starts on our own hardstand: staged, checked and lifted by our team, not a subcontractor's.",
  },
  {
    key: "load",
    eyebrow: "02 — Load",
    title: "Loaded on the same file.",
    body: "Container, chassis and driver are booked together, so the handoff from yard to road is a lift, not a phone call.",
  },
  {
    key: "road",
    eyebrow: "03 — Road",
    title: "Every leg of the journey.",
    body: "Local, metro and interstate legs run on live tracking. You see the truck the way our dispatch team does.",
  },
  {
    key: "port",
    eyebrow: "04 — Port",
    title: "Quay to vessel, no gaps.",
    body: "Terminal slots, customs release and stevedoring are coordinated in-house, so your box makes the cut-off.",
  },
  {
    key: "sea",
    eyebrow: "05 — Sea",
    title: "Across APAC, tracked to the door.",
    body: "Australia, New Zealand, Hong Kong and China. One operator from the yard gate to the final mile.",
  },
];

/**
 * Scroll-scrubbed 3D logistics film: yard → reach stacker → truck → road →
 * quay crane → vessel. The section is tall; its stage is `position: sticky`,
 * so there is no pin-spacer reflow and the browser composites it for free.
 */
export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const unitRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const [{ JourneyScene }, { buildTimeline, CHAPTERS }] = await Promise.all([
        import("@/lib/journey/scene"),
        import("@/lib/journey/timeline"),
      ]);
      if (disposed || !canvasRef.current || !sectionRef.current) return;

      let scene: InstanceType<typeof JourneyScene>;
      try {
        scene = new JourneyScene(canvasRef.current, { mobile: window.matchMedia("(max-width: 767px)").matches });
      } catch {
        setFailed(true);
        return;
      }
      const state = scene.initialState();
      const tl = buildTimeline(scene, state);
      const total = tl.duration();

      const stage = canvasRef.current.parentElement!;
      const resize = () => scene.resize(stage.clientWidth, stage.clientHeight);
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(stage);

      let target = 0;
      let current = 0;
      let visible = true;
      let activeChapter = -1;
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => (target = self.progress),
      });
      target = current = st.progress;

      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "200px 0px" });
      io.observe(sectionRef.current);

      const frame = (time: number, deltaMs: number) => {
        if (!visible) return;
        // critically-damped follow on top of Lenis: no jumps on wheel ticks or scrollbar drags
        const k = 1 - Math.exp(-(deltaMs / 1000) * 9);
        current += (target - current) * k;
        if (Math.abs(target - current) < 1e-5) current = target;
        tl.progress(current);
        const t = tl.time();
        scene.update(state, t);
        scene.tick(time);
        scene.render();

        // HUD — written straight to the DOM, no React renders per frame
        let ch = 0;
        for (let i = 0; i < CHAPTERS.length; i++) if (t >= CHAPTERS[i].at) ch = i;
        if (ch !== activeChapter) {
          activeChapter = ch;
          chapterRefs.current.forEach((el, i) => el?.toggleAttribute("data-active", i === ch));
          railRefs.current.forEach((el, i) => {
            el?.toggleAttribute("data-active", i === ch);
            el?.toggleAttribute("data-done", i < ch);
          });
        }
        if (speedRef.current) speedRef.current.textContent = String(Math.min(99, Math.round(scene.speed))).padStart(2, "0");
        if (unitRef.current) unitRef.current.textContent = state.mode >= 4 ? "KN" : "KM/H";
        if (barRef.current) barRef.current.style.transform = `scaleX(${t / total})`;
      };
      // `?journey-debug` freezes the loop and exposes a manual seek — used for visual QA screenshots
      const debug = new URLSearchParams(window.location.search).has("journey-debug");
      if (debug) {
        (window as unknown as { __journeySeek?: (p: number) => void }).__journeySeek = (p: number) => {
          target = current = p;
          frame(gsap.ticker.time, 16);
        };
      } else gsap.ticker.add(frame);
      frame(gsap.ticker.time, 1000);
      setReady(true);

      cleanup = () => {
        gsap.ticker.remove(frame);
        st.kill();
        io.disconnect();
        ro.disconnect();
        tl.kill();
        scene.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} id="journey" aria-label="From yard to vessel" className="relative h-[1250vh] bg-[#eef0f3] md:h-[1450vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />
        {failed && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/cranes.jpg)" }} aria-hidden />
        )}

        {/* soft scrim keeps copy legible over the 3D stage */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(to_top,rgba(238,240,243,0.95)_0%,rgba(238,240,243,0.6)_30%,transparent_55%)] md:bg-[linear-gradient(to_right,rgba(238,240,243,0.92)_0%,rgba(238,240,243,0.55)_30%,transparent_48%)]" />

        {/* chapter copy */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-24 sm:px-8 md:inset-y-0 md:left-0 md:right-auto md:flex md:w-[44vw] md:max-w-[560px] md:items-center md:pb-0 md:pl-12">
          <div className="relative h-[190px] w-full md:h-[260px]">
            {CHAPTER_COPY.map((c, i) => (
              <div
                key={c.key}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className="journey-chapter absolute inset-0"
              >
                <p className="font-mono text-[11px] tracking-[0.22em] text-neutral-500 uppercase">{c.eyebrow}</p>
                <h3 className="mt-3 text-[34px] leading-[0.98] font-semibold tracking-[-0.03em] text-neutral-950 sm:text-5xl md:text-[58px]">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-[400px] text-[14px] leading-relaxed text-neutral-600 md:text-[15px]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* speedometer, like a dash readout */}
        <div className="pointer-events-none absolute top-24 left-5 z-10 font-mono text-[11px] tracking-[0.2em] text-neutral-500 sm:left-8 md:left-12">
          <span ref={speedRef} className="text-neutral-900 tabular-nums">00</span> <span ref={unitRef}>KM/H</span>
        </div>

        {/* chapter rail */}
        <ol className="pointer-events-none absolute top-24 right-5 z-10 hidden flex-col items-end gap-3 font-mono text-[10px] tracking-[0.22em] uppercase sm:right-8 md:flex md:right-12">
          {CHAPTER_COPY.map((c, i) => (
            <li
              key={c.key}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              className="journey-rail flex items-center gap-3"
            >
              {c.eyebrow.split(" — ")[1]}
              <span className="block h-px w-6 bg-current" />
            </li>
          ))}
        </ol>

        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-black/5">
          <div ref={barRef} className="h-full origin-left bg-[var(--brand)]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
