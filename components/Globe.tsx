"use client";

import { useEffect, useRef } from "react";
import { LAND_POINTS } from "@/lib/landPoints";

const CITIES: { name: string; lon: number; lat: number; hub?: boolean }[] = [
  { name: "Sydney", lon: 151.2, lat: -33.9, hub: true },
  { name: "Melbourne", lon: 144.9, lat: -37.8, hub: true },
  { name: "Auckland", lon: 174.8, lat: -36.8, hub: true },
  { name: "Hong Kong", lon: 114.2, lat: 22.3, hub: true },
  { name: "Shanghai", lon: 121.5, lat: 31.2, hub: true },
  { name: "Singapore", lon: 103.8, lat: 1.35 },
  { name: "Tokyo", lon: 139.7, lat: 35.7 },
  { name: "Dubai", lon: 55.3, lat: 25.2 },
  { name: "Los Angeles", lon: -118.2, lat: 34.0 },
];
const ROUTES: [number, number][] = [
  [4, 1], [3, 0], [0, 2], [5, 1], [6, 0], [7, 3], [8, 0], [4, 2],
];

const D2R = Math.PI / 180;
type V3 = [number, number, number];
const toXYZ = (lon: number, lat: number): V3 => [Math.cos(lat * D2R) * Math.sin(lon * D2R), Math.sin(lat * D2R), Math.cos(lat * D2R) * Math.cos(lon * D2R)];

function slerp(a: V3, b: V3, t: number): V3 {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(d);
  if (w < 1e-4) return a;
  const s = Math.sin(w);
  const k0 = Math.sin((1 - t) * w) / s, k1 = Math.sin(t * w) / s;
  return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
}

/** Dotted globe on a 2D canvas: drag to spin, eases back to auto-rotation. */
export default function Globe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const pts: V3[] = [];
    for (let i = 0; i < LAND_POINTS.length; i += 2) pts.push(toXYZ(LAND_POINTS[i], LAND_POINTS[i + 1]));
    const cities = CITIES.map((c) => ({ ...c, v: toXYZ(c.lon, c.lat) }));
    const arcs = ROUTES.map(([a, b]) => Array.from({ length: 48 }, (_, i) => {
      const t = i / 47;
      const p = slerp(cities[a].v, cities[b].v, t);
      const lift = 1 + Math.sin(t * Math.PI) * 0.12;
      return [p[0] * lift, p[1] * lift, p[2] * lift] as V3;
    }));

    let rotY = -2.35; // start over APAC
    let rotX = 0.28;
    let vel = 0;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let w = 0, h = 0, dpr = 1;
    let visible = true;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const project = (v: V3, R: number, cx: number, cy: number) => {
      const cy_ = Math.cos(rotY), sy = Math.sin(rotY), cx_ = Math.cos(rotX), sx = Math.sin(rotX);
      const x1 = v[0] * cy_ + v[2] * sy;
      const z1 = -v[0] * sy + v[2] * cy_;
      const y2 = v[1] * cx_ - z1 * sx;
      const z2 = v[1] * sx + z1 * cx_;
      return { x: cx + x1 * R, y: cy - y2 * R, z: z2 };
    };

    let t0 = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      if (!dragging) {
        vel *= Math.pow(0.04, dt);
        rotY += vel + (reduce ? 0 : dt * 0.06);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.46;
      const cx = w / 2, cy = h / 2;

      for (const v of pts) {
        const p = project(v, R, cx, cy);
        if (p.z < 0) continue;
        const a = 0.25 + p.z * 0.75;
        ctx.fillStyle = `rgba(96,140,255,${a})`;
        ctx.fillRect(p.x - 0.9, p.y - 0.9, 1.8, 1.8);
      }

      const time = now / 1000;
      arcs.forEach((arc, i) => {
        ctx.beginPath();
        let started = false;
        for (const v of arc) {
          const p = project(v, R, cx, cy);
          if (p.z < -0.05) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(120,160,255,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // travelling pulse
        const k = ((time * 0.22 + i * 0.17) % 1) * (arc.length - 1);
        const p = project(arc[Math.floor(k)], R, cx, cy);
        if (p.z > 0) {
          ctx.fillStyle = "#e9d9bd";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.font = "600 10px ui-monospace, SFMono-Regular, monospace";
      for (const c of cities) {
        const p = project(c.v, R, cx, cy);
        if (p.z < 0.08) continue;
        const r = c.hub ? 4 : 2.6;
        ctx.fillStyle = c.hub ? "#3df5c4" : "rgba(255,255,255,0.85)";
        ctx.globalAlpha = Math.min(1, p.z * 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (c.hub) {
          const label = c.name.toUpperCase();
          const tw = ctx.measureText(label).width;
          ctx.fillStyle = "#1d55d6";
          ctx.fillRect(p.x + 8, p.y - 16, tw + 10, 15);
          ctx.fillStyle = "#fff";
          ctx.fillText(label, p.x + 13, p.y - 5);
        }
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(draw);

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = (e.clientX - lastX) * 0.005;
      rotY += dx;
      vel = dx;
      rotX = Math.max(-0.6, Math.min(0.8, rotX + (e.clientY - lastY) * 0.004));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = () => (dragging = false);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return <canvas ref={ref} className={`cursor-grab touch-pan-y active:cursor-grabbing ${className}`} aria-label="Interactive globe of Eliv trade lanes" role="img" />;
}
