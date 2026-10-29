/** Eliv mark: a stylised "EL" in a roundel, plus the wordmark. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden>
        <circle cx="20" cy="20" r="20" fill="#fff" />
        <path d="M9 13.5h12.5l-1.6 3.4H13.4v1.8h5.6l-1.5 3.2h-4.1v1.9h6.8l-1.6 3.4H9z" fill="#1d55d6" />
        <path d="M23.2 13.5h4.2v10.3h5.1l-1.6 3.4h-7.7z" fill="#0f2a6b" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[0.18em]">ELIV</span>
    </span>
  );
}
