import { useMemo, useState } from "react";
import useReveal from "../hooks/useReveal";

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Python", "SQL", "R", "JavaScript", "TypeScript", "PL/pgSQL"],
  },
  {
    title: "Machine Learning",
    items: ["Scikit-learn", "XGBoost", "Pandas", "NumPy", "Matplotlib", "Seaborn", "ARIMA"],
  },
  {
    title: "AI & LLMs",
    items: [
      "LangGraph", "LangChain", "FastAPI", "OpenAI API", "Claude API", "Hugging Face",
      "ChromaDB", "pgvector", "RAG", "Pydantic", "Streamlit", "Langfuse",
    ],
  },
  {
    title: "Visualization & BI",
    items: ["Tableau", "Power BI", "Looker", "Looker Studio", "Amazon QuickSight"],
  },
  {
    title: "Data & Infrastructure",
    items: [
      "PostgreSQL", "Snowflake", "Kafka", "dbt", "Airflow", "MLflow", "Kubernetes",
      "Prometheus", "Grafana", "Evidently AI", "Docker", "ArcGIS",
      "Google Earth Engine", "GeoPandas", "Git", "GitHub Actions",
    ],
  },
  {
    title: "Web & Cloud",
    items: [
      "React", "Leaflet", "Node.js", "Express", "Vercel", "Render", "AWS Athena",
      "Lambda", "Glue", "Redshift", "SageMaker", "S3", "Excel",
    ],
  },
];

const CATEGORIES = ["All", ...SKILL_GROUPS.map((g) => g.title)];

export default function Skills() {
  const [active, setActive] = useState("All");
  const reveal = useReveal();

  const groups = useMemo(
    () => (active === "All" ? SKILL_GROUPS : SKILL_GROUPS.filter((g) => g.title === active)),
    [active]
  );

  return (
    <section id="skills" className="section">
      <div className="container-page">
        <p className="section-label mb-3">Skills</p>
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">What I work with</h2>

        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`pill-tab ${active === cat ? "pill-tab-active" : "pill-tab-inactive"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={reveal.ref} className={`card grid gap-8 p-7 sm:grid-cols-2 sm:p-10 lg:grid-cols-3 ${reveal.className}`}>
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-ink-soft">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
