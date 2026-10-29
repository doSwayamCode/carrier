import { AIRLINES, SHIPPING_LINES } from "@/lib/content";

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="border-b border-neutral-200 pb-3 font-mono text-[10px] tracking-[0.22em] text-neutral-500 uppercase">{title}</p>
      <ul className="mt-2 grid grid-cols-2 gap-x-6">
        {items.map((n) => (
          <li key={n} className="border-b border-neutral-100 py-2.5 text-sm text-neutral-800 transition-colors hover:text-[var(--brand)]">{n}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-10 md:flex-row md:items-end">
          <h2 className="text-5xl font-semibold tracking-[-0.045em] uppercase md:text-6xl">Our partners</h2>
          <p className="text-sm text-neutral-500">Airlines and shipping lines we place freight with.</p>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Column title="Airlines" items={AIRLINES} />
          <Column title="Shipping lines" items={SHIPPING_LINES} />
        </div>
      </div>
    </section>
  );
}
