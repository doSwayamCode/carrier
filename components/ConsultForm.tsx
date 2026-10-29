"use client";

import Image from "next/image";
import { useState } from "react";

const field = "mt-1.5 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white";

export default function ConsultForm() {
  const [sent, setSent] = useState(false);
  return (
    <section id="book" className="bg-[var(--paper)] px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Book a Consulting Call</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-neutral-600">Share a few details about your business and we&apos;ll schedule a focused conversation with our consultants.</p>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
        <form
          className="rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <p className="text-2xl font-semibold tracking-tight">Thanks — we&apos;ll be in touch.</p>
              <p className="mt-2 text-sm text-neutral-500">A consultant will confirm a time within one business day.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-medium">Full Name *<input required className={field} placeholder="Your full name" /></label>
              <label className="text-xs font-medium">Work Email *<input required type="email" className={field} placeholder="you@company.com" /></label>
              <label className="text-xs font-medium">Phone Number *<input required type="tel" className={field} placeholder="e.g. 0400 000 000" /></label>
              <label className="text-xs font-medium">Company<input className={field} placeholder="Your company" /></label>
              <label className="text-xs font-medium sm:col-span-2">Preferred date / time<input className={field} placeholder="e.g. Tue 10:00 AM AEST" /></label>
              <label className="text-xs font-medium sm:col-span-2">How can we help? *<textarea required rows={4} className={field} placeholder="Tell us about your goals or the challenge you'd like to discuss…" /></label>
              <div className="sm:col-span-2">
                <button className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--sand)] px-5 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase transition-transform hover:scale-[1.03]">
                  Request a call <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          )}
        </form>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl">
            <Image src="/images/team.jpg" alt="Consultants planning a freight program" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src="/images/office.jpg" alt="Eliv office" fill sizes="20vw" className="object-cover grayscale" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src="/images/port.jpg" alt="Container terminal from above" fill sizes="20vw" className="object-cover grayscale" />
          </div>
        </div>
      </div>
    </section>
  );
}
