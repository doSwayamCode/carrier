import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConsultForm from "@/components/ConsultForm";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  const cards = [
    { k: "Visit", v: CONTACT.address },
    { k: "Call", v: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
    { k: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Talk to the team that moves it</>} body="Tell us what you're shipping and where. A real person replies within one business day." image="/images/office.jpg" />
      <section className="bg-white px-5 py-16 sm:px-8 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.k} className="rounded-lg border border-neutral-200 p-7">
              <p className="font-mono text-[10px] tracking-[0.22em] text-neutral-500 uppercase">{c.k}</p>
              {c.href ? <a href={c.href} className="mt-6 block text-xl font-semibold tracking-tight hover:text-[var(--brand)]">{c.v}</a> : <p className="mt-6 text-xl font-semibold tracking-tight">{c.v}</p>}
            </div>
          ))}
        </div>
      </section>
      <ConsultForm />
    </>
  );
}
