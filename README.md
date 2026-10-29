# Eliv Logistics — website

A Next.js clone of the Eliv site. Its centrepiece is a scroll-driven 3D freight film in the style of
unitedcarriers.com: courier pickup → yard → reach stacker → truck → road → quay crane → vessel. The film is
rebuilt so the container stays **horizontal** for the whole journey. It opens with a courier sliding a parcel
into the open container, and day turns to night on the highway so the port and the sailing play out after dark.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## How the journey film works

| File | Role |
| --- | --- |
| `lib/journey/textures.ts` | All textures (corrugated steel, road markings, water normals, wake foam, decals) are drawn on canvases at start-up. Nothing is downloaded, so scrubbing never waits on an image. |
| `lib/journey/models.ts` | Procedural models: 40ft hero container, reach stacker (the boom is solved with inverse kinematics from the spreader position), tractor and skeletal trailer, STS quay crane with trolley and hoist, container vessel. Stacks are drawn with `InstancedMesh`, one draw call each. |
| `lib/journey/scene.ts` | `JourneyScene` derives the whole world from one plain `JourneyState` object. The truck follows a Catmull-Rom path, and the trailer articulates on curves. The container is handed between "sockets" (stack → stacker → trailer → crane → ship). |
| `lib/journey/timeline.ts` | A paused GSAP timeline that tweens only numbers in `state` (a 17-unit courier prologue, then the main film; `night` drives dusk). Scroll maps linearly onto it, so scrubbing backwards is exact. |
| `components/Journey.tsx` | A tall section with a `position: sticky` stage (no pin-spacer reflow), smoothing on top of Lenis, a HUD written straight to the DOM (no React renders per frame), and rendering only while the section is on screen. |

Why it stays smooth: no frame sequences to stream; Three.js is lazy-loaded (it is not in the first-load
JS); per-frame work is allocation-free; DPR is capped (1.5 on mobile); and the shadow frustum follows the
camera.

GitHub Pages: `GITHUB_PAGES=true npm run build` writes a static export under `/carrier` to `out/`.

Visual QA: open `/?journey-debug` and call `window.__journeySeek(0..1)` to freeze the film at any point.

Photos in `public/images` are from Unsplash (Unsplash License). The landmass dots on the globe come from
Natural Earth via `world-atlas` (`scripts/land.mjs`).
