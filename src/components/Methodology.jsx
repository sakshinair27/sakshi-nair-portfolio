import useReveal from "../hooks/useReveal";

const principles = [
  {
    label: "Models",
    text: "Every model is validated on a held-out set before it's promoted to production.",
  },
  {
    label: "Agents",
    text: "Every agent pauses for human approval before anything ships, and isolates a failed branch instead of taking down the run.",
  },
  {
    label: "Claims",
    text: "Every claim needs 2+ independent sources, or a pre-registered test, before it's marked verified.",
  },
  {
    label: "Drift",
    text: "Every production model is watched for drift, with CI gates that block a retrain that silently regresses.",
  },
];

export default function Methodology() {
  const reveal = useReveal();
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <p className="section-label mb-7 text-center">How I verify</p>
        <div ref={reveal.ref} className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${reveal.className}`}>
          {principles.map((principle, i) => (
            <div key={principle.label} className="card px-5 py-5" style={{ animationDelay: `${i * 80}ms` }}>
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold text-accent"
                style={{ background: "rgb(var(--color-accent) / 0.12)", boxShadow: "0 0 16px -4px rgb(var(--color-accent) / 0.6)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
                {principle.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{principle.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
