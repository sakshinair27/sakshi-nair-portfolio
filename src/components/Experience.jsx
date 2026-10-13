import useReveal from "../hooks/useReveal";

const JOBS = [
  {
    title: "AI Consultant — Heartland Community Network",
    location: "Houston, TX",
    dates: "Jun 2026 – Present",
    bullets: [
      <>
        Benchmarked <strong className="text-ink">10+ open-source medical LLMs</strong> (Hugging Face)
        on accuracy, licensing, and GPU/VRAM requirements, selecting MedGemma 1.5 4B as the core
        model for a healthcare RAG system summarizing medical records.
      </>,
      <>
        Designed the retrieval and inference stack: Qwen3-Embedding with a MedCPT reranker,
        OpenMed NER for clinical entity extraction and PII de-identification, and speculative
        decoding to cut generation latency.
      </>,
      <>
        Built LLM-powered summarization workflows condensing lengthy patient records into concise,
        actionable summaries, <strong className="text-ink">cutting practitioner review time 40%</strong>{" "}
        and supporting faster, better-informed care decisions.
      </>,
    ],
  },
  {
    title: "Software Engineer — Indiana University, O'Neill School",
    location: "Bloomington, IN",
    dates: "Jan 2026 – May 2026",
    bullets: [
      <>
        Deployed a water-quality site (React/Leaflet on Vercel, Node/Express on Render) opening
        on-demand Earth Engine chlorophyll/temperature monitoring to{" "}
        <strong className="text-ink">2,545 undersized waterbodies</strong>, 71% below the global
        lake-database threshold.
      </>,
      <>
        Enabled per-lake coverage analysis, the top driver of a floating solar array&rsquo;s
        environmental impact, by designing a relational schema linking{" "}
        <strong className="text-ink">3,277 installations across 36 countries</strong> to their
        previously unlinked host waterbodies.
      </>,
      <>
        Validated AI classification and satellite-derived install dates against blind expert
        review, reaching <strong className="text-ink">88–96% label agreement</strong> on 252
        arrays and 91.5% of high-confidence dates within six months of ground truth.
      </>,
    ],
  },
  {
    title: "Business Analyst — Indiana University, Kelley School",
    location: "Bloomington, IN",
    dates: "Apr 2025 – May 2026",
    bullets: [
      <>
        Cut ETL runtime <strong className="text-ink">42 → 18 min (~57% faster)</strong> with an
        incremental load keyed on transaction ID, eliminating ~1.8% duplicate rows that had
        inflated quote counts on Redshift.
      </>,
      <>
        Cut false positives <strong className="text-ink">5 → 0 with full recall</strong> on 6
        incidents over 14 months across 5,000+ daily transactions, replacing static 2σ thresholds
        with ARIMA-residual thresholds to handle seasonality (Python, AWS, Glue).
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
    dates: "Aug 2022 – May 2024",
  },
  {
    degree: "B.S. Computer Science — Osmania University, Telangana, India",
    dates: "Jun 2019 – Jun 2022",
  },
];

export default function Experience() {
  const reveal = useReveal();
  return (
    <section id="experience" className="section !pb-10 sm:!pb-14">
      <div className="container-page">
        <p className="section-label mb-3">Experience</p>
        <h2 className="mb-12 text-2xl font-bold sm:text-3xl">Where I&rsquo;ve worked</h2>

        <div ref={reveal.ref} className={`card space-y-10 p-7 sm:p-10 ${reveal.className}`}>
          {JOBS.map((job, i) => (
            <div key={job.title} className="relative pl-8 sm:pl-10">
              <span
                className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-paper"
                style={{ boxShadow: "0 0 10px 1px rgb(var(--color-accent) / 0.7)" }}
              />
              {i < JOBS.length - 1 && (
                <span className="absolute left-[4.5px] top-5 h-[calc(100%+1.5rem)] w-px bg-white/10" />
              )}
              <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-baseline">
                <div>
                  <h3 className="font-heading text-lg font-bold">{job.title}</h3>
                  <p className="text-sm text-ink-soft">{job.location}</p>
                </div>
                <p className="font-mono text-sm text-ink-soft">{job.dates}</p>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft [&>li]:leading-relaxed">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="card mt-8 p-7 sm:p-10">
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
      </div>
    </section>
  );
}
