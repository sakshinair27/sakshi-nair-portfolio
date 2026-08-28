const principles = [
  {
    label: "Dashboards",
    text: "Every dashboard is checked against SQL ground truth before it ships.",
  },
  {
    label: "Pipelines",
    text: "Every ETL path runs twice, independently, and diffs against itself.",
  },
  {
    label: "Claims",
    text: "Every claim needs 2+ independent sources before it's marked verified.",
  },
  {
    label: "Failures",
    text: "Every failure is isolated, so one bad branch doesn't take down the whole system.",
  },
];

export default function Methodology() {
  return (
    <section className="border-t border-ink/10 bg-paper py-10 sm:py-12">
      <div className="container-page">
        <p className="section-label mb-6 text-center">How I verify</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <div
              key={principle.label}
              className="rounded-lg border border-accent/20 bg-accent/5 px-5 py-4 dark:bg-accent/10"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent">
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
