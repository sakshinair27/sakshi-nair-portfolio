import AnimatedNumber from "./AnimatedNumber";
import LiveBackground from "./LiveBackground";
import useTypewriter from "../hooks/useTypewriter";

const ROLES = ["AI Engineer", "Software Engineer", "Data Scientist", "ML Engineer", "Data Analyst"];

const STATS = [
  { value: 3.9, decimals: 1, suffix: "", label: "M.S. Data Science GPA, Indiana University", tail: "/4.0" },
  { value: 90, decimals: 0, suffix: "%", label: "contradictions resolved by an agentic memory pipeline I built (Juno)" },
  { value: 79, decimals: 0, suffix: "%", label: "recall on an ML model I shipped to Kubernetes production (Churn MLOps)" },
  { value: 40, decimals: 0, suffix: "%", label: "faster practitioner review time from an LLM summarization pipeline I designed" },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="top" className="section relative overflow-hidden pt-12 !pb-14 sm:pt-16 sm:!pb-20">
      <LiveBackground />
      <div className="container-page relative z-10">
        <div className="status-badge mb-7">
          <span className="status-badge-pill">
            <span className="status-badge-dot"></span>
            Available Now · Graduated May 2026 · OPT with STEM Extension
          </span>
        </div>

        <p className="mb-5 flex items-center text-xl font-bold text-ink sm:text-2xl" aria-live="polite">
          <span>{typed}</span>
          <span className="type-caret h-[1.05em]" />
          <span className="sr-only">
            — AI Engineer, Software Engineer, Data Scientist, ML Engineer, Data Analyst
          </span>
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-6xl">
          I build the <span className="text-accent">verified side</span> of applied AI.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Agentic LangGraph pipelines and RAG systems validated against ground truth, MLOps
          platforms that monitor and gate their own drift, and the data infrastructure feeding
          all of it.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="mailto:sakshinair086@gmail.com" className="btn-primary">
            Let&rsquo;s talk
          </a>
          <a href="#projects" className="btn-secondary">
            View my work
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-metric">
              <p className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                <AnimatedNumber
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                {stat.tail && <span className="text-base font-medium text-ink-soft">{stat.tail}</span>}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
