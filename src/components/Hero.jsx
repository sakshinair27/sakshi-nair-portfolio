export default function Hero() {
  return (
    <section id="top" className="section !pb-12 sm:!pb-16">
      <div className="container-page">
        <div className="status-badge mb-6">
          <span className="status-badge-pill">
            <span className="status-badge-dot"></span>
            Available Now · Graduated May 2026 · OPT with STEM Extension
          </span>
          <span className="status-badge-line"></span>
          <span className="status-badge-role">Data Analyst / Engineer</span>
        </div>
        <p className="section-label mb-5">Bloomington, IN (open to relocate)</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.15] sm:text-5xl">
          I build the <span className="text-accent">verified side</span> of data analytics:
        </h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink-soft sm:text-2xl">
          BI dashboards audited against SQL ground truth, production-grade PostgreSQL/dbt
          warehouses, and the ML pipelines feeding them.
        </p>
        <p className="mt-6 max-w-2xl text-base text-ink-soft">
          M.S. Data Science, Indiana University (GPA 3.9/4.0) · graduating May 2026 · 7× warehouse
          query speedup · 12/12 BI dashboards at exact parity.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="mailto:sakshinair086@gmail.com" className="btn-primary">
            Let&rsquo;s talk
          </a>
          <a href="#projects" className="btn-secondary">
            View my work
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="stat-metric">
            <p className="font-heading text-2xl font-bold text-ink">
              3.9<span className="text-base font-medium text-ink-soft">/4.0</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">M.S. Data Science GPA, Indiana University</p>
          </div>
          <div className="stat-metric">
            <p className="font-heading text-2xl font-bold text-ink">7×</p>
            <p className="mt-1 text-xs text-ink-soft">query latency cut on a live warehouse (CommerceLens)</p>
          </div>
          <div className="stat-metric">
            <p className="font-heading text-2xl font-bold text-ink">12/12</p>
            <p className="mt-1 text-xs text-ink-soft">dashboards at exact parity across 3 BI tools (Northwind)</p>
          </div>
          <div className="stat-metric">
            <p className="font-heading text-2xl font-bold text-ink">
              $10K<span className="text-base font-medium text-ink-soft">/mo</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">cost saved from an A/B test I designed &amp; presented</p>
          </div>
        </div>
      </div>
    </section>
  );
}
