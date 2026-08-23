export default function About() {
  return (
    <section id="about" className="section border-t border-ink/10">
      <div className="container-page grid gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <p className="section-label mb-3">About</p>
          <h2 className="text-2xl font-bold sm:text-3xl">Data grounded in verification, not vibes.</h2>
        </div>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            I&rsquo;m a data scientist bridging geospatial and remote-sensing analysis with causal
            inference — from satellite-imagery classification and spatial pipelines to A/B testing
            and forecasting models — with production ML/data infrastructure and automated reporting
            underneath. I turn ambiguous business questions into measurable, statistically rigorous
            outcomes for non-technical stakeholders.
          </p>
          <p>
            My habit is validating a dashboard against the underlying data, not just trusting the
            visual — that&rsquo;s caught real bugs (a silently mismatched month-end date bucket, a
            query plan that wasn&rsquo;t actually the bottleneck it looked like) before they reached
            a stakeholder. I care about the same thing whether I&rsquo;m in Power BI, a PostgreSQL
            warehouse, or a LangGraph agent pipeline: can I prove this number is right, and can
            someone else verify it too.
          </p>
          <p>
            Currently finishing my M.S. in Data Science at Indiana University (GPA 3.9/4.0, May
            2026), after an M.S. in Applied Statistics and a B.S. in Mathematics, Statistics &amp;
            Computer Science. Based in Bloomington, IN — open to relocating.
          </p>
        </div>
      </div>
    </section>
  );
}
