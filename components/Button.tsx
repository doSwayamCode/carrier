import Link from "next/link";
import RollText from "./RollText";

export default function Button({ href, children, variant = "light" }: { href: string; children: string; variant?: "light" | "outline-light" | "dark" | "outline-dark" | "sand" }) {
  const styles = {
    light: "bg-white text-black",
    "outline-light": "border border-white/40 text-white hover:border-white",
    dark: "bg-black text-white",
    "outline-dark": "border border-black/20 text-black hover:border-black",
    sand: "bg-[var(--sand)] text-black",
  }[variant];
  return (
    <Link href={href} className={`group inline-flex h-11 items-center rounded-full px-5 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors ${styles}`}>
      <RollText text={children} />
    </Link>
  );
}
