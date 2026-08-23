const JOBS = [
  {
    title: "Research Assistant — Indiana University, O'Neill School",
    location: "Bloomington, IN",
    dates: "Jan 2026 – May 2026",
    bullets: [
      <>
        Built a global platform mapping <strong className="text-ink">3,000+ floating solar installations</strong>{" "}
        across 80+ countries by fusing Sentinel-2 and Landsat-8 imagery through Google Earth Engine
        and Python/GeoPandas pipelines processing 500+ GB of satellite data; switched from
        exact-overlap to a buffered spatial join to correctly reconcile footprints against messy
        real-world water-body boundaries.
      </>,
      <>
        Shipped an interactive React/Leaflet front end on a Node/Express REST API backend (
        <strong className="text-ink">99% uptime</strong>), replacing manual custom data pulls with
        a self-serve platform non-technical stakeholders could query directly for on-demand metrics.
      </>,
    ],
  },
  {
    title: "Data Analyst — Indiana University, Kelley School",
    location: "Bloomington, IN",
    dates: "Apr 2025 – May 2026",
    bullets: [
      <>
        Designed and analyzed pricing A/B tests (two-sample t-tests) measuring price sensitivity;
        presented results to non-technical stakeholders who approved the winning variant,{" "}
        <strong className="text-ink">cutting costs by $10K/month</strong>.
      </>,
      <>
        Reduced false-positive alert noise while still catching genuine data issues by tuning
        anomaly detection thresholds on ARIMA/regression forecasting models (Python, AWS Lambda,
        Glue) monitoring <strong className="text-ink">5,000+ daily Redshift transactions</strong>.
      </>,
    ],
  },
  {
    title: "Data Scientist Intern — Suhora Technologies",
    location: "Delhi, India",
    dates: "Jan 2024 – Jul 2024",
    bullets: [
      <>
        Fixed overlapping spectral signatures misclassifying built-up and barren land in initial
        ISODATA/Maximum Likelihood Classification on 1985 and 2014 Hyderabad Landsat imagery by
        iterating on training-site selection in ArcGIS,{" "}
        <strong className="text-ink">improving accuracy to 85%</strong> (Kappa = 0.744) from an
        80% baseline (Kappa = 0.719).
      </>,
      <>
        Delivered a change-detection analysis quantifying 29 years of urban sprawl:{" "}
        <strong className="text-ink">
          86.35% built-up increase, 24.25% agricultural decline, and 53.41% water-body reduction
        </strong>
        .
      </>,
    ],
  },
];

const EDUCATION = [
  {
    degree: "M.S. Data Science — Indiana University Bloomington",
    detail: "GPA 3.9/4.0",
    dates: "Aug 2024 – May 2026",
  },
  {
    degree: "M.S. Applied Statistics — Symbiosis International University, Maharashtra, India",
    dates: "May 2024",
  },
  {
    degree: "B.S. Mathematics, Statistics & Computer Science — Osmania University, Telangana, India",
    dates: "Jun 2022",
  },
];

const CERTIFICATIONS = [
  "Google Cloud — Generative AI Fundamentals",
  "Kaggle — Machine Learning",
  "Kaggle — SQL",
  "DeepLearning.AI — LangChain for LLM Applications",
];

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-ink/10 bg-surface">
      <div className="container-page">
        <p className="section-label mb-3">Experience</p>
        <h2 className="mb-12 text-2xl font-bold sm:text-3xl">Where I&rsquo;ve worked</h2>

        <div className="space-y-10">
          {JOBS.map((job, i) => (
            <div key={job.title}>
              <div className={`grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline ${i > 0 ? "border-t border-ink/10 pt-10" : ""}`}>
                <div>
                  <h3 className="font-heading text-lg font-bold">{job.title}</h3>
                  <p className="text-sm text-ink-soft">{job.location}</p>
                </div>
                <p className="font-mono text-sm text-ink-soft">{job.dates}</p>
              </div>
              <ul className="ml-5 mt-3 list-disc space-y-2 text-ink-soft [&>li]:leading-relaxed">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-ink/10 pt-12">
          <h3 className="mb-6 font-heading text-lg font-bold">Education</h3>
          <div className="space-y-6">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                <p className="font-semibold">
                  {edu.degree}
                  {edu.detail && <span className="font-normal text-ink-soft"> · {edu.detail}</span>}
                </p>
                <p className="font-mono text-sm text-ink-soft">{edu.dates}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-10">
          <h3 className="mb-4 font-heading text-lg font-bold">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert} className="chip">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
