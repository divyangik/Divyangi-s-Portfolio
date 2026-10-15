import type { SVGProps } from "react";

const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 40" aria-hidden {...p}><path {...base} d="M20 4l4 11 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z" /></svg>
);
export const Heart = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 40" aria-hidden {...p}><path {...base} d="M20 34S5 25 5 14c0-5 4-8 8-8 3 0 6 2 7 5 1-3 4-5 7-5 4 0 8 3 8 8 0 11-15 20-15 20z" /></svg>
);
export const Sparkle = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 40" aria-hidden {...p}><path {...base} d="M20 3c1 10 5 15 17 17-12 2-16 7-17 17-1-10-5-15-17-17 12-2 16-7 17-17z" /></svg>
);
export const Squiggle = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 24" aria-hidden {...p} className={`draw-line ${p.className ?? ""}`}><path {...base} strokeWidth={3} d="M2 14c15-14 25 10 40 0s25-14 40 0 25 10 40 0 25-14 40 0 25 8 36 0" /></svg>
);
export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 80 50" aria-hidden {...p}><path {...base} d="M4 8c20 4 40 14 58 34M62 42l-2-14M62 42l-14-2" /></svg>
);
export const Pencil = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 80" aria-hidden {...p}>
    <path d="M6 6h12v52H6z" fill="var(--butter)" stroke="var(--ink)" strokeWidth="2" />
    <path d="M6 6h12v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2z" fill="var(--blush)" stroke="var(--ink)" strokeWidth="2" />
    <path d="M6 58l6 18 6-18z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M10 70l2 6 2-6z" fill="var(--ink)" />
  </svg>
);
