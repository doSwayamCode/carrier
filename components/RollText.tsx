/** Letter-by-letter roll on hover, as on the reference nav. Parent needs the `group` class. */
export default function RollText({ text }: { text: string }) {
  return (
    <span className="relative inline-flex overflow-hidden" aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden className="relative inline-block">
          <span
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
          <span
            className="absolute top-full left-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
