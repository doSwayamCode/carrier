import Image from "next/image";

export default function PageHero({ eyebrow, title, body, image }: { eyebrow: string; title: React.ReactNode; body: string; image: string }) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-black px-5 pt-40 pb-16 text-white sm:px-8 md:px-12 md:pb-20">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/40 to-black/20" />
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-mono text-[11px] tracking-[0.24em] text-white/60 uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[0.9] font-semibold tracking-[-0.05em] uppercase md:text-[96px]">{title}</h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75">{body}</p>
      </div>
    </section>
  );
}
