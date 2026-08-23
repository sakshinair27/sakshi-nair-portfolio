const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Python", "SQL", "R", "JavaScript", "PL/pgSQL"],
  },
  {
    title: "Machine Learning",
    items: ["Scikit-learn", "XGBoost", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
  {
    title: "AI & LLMs",
    items: ["LangGraph", "LangChain", "OpenAI API", "ChromaDB", "RAG", "Pydantic", "Streamlit"],
  },
  {
    title: "Visualization & BI",
    items: ["Tableau", "Power BI", "Looker", "Looker Studio", "Amazon QuickSight"],
  },
  {
    title: "Data & Infrastructure",
    items: [
      "PostgreSQL", "Snowflake", "dbt", "Airflow", "Docker", "ArcGIS",
      "Google Earth Engine", "GeoPandas", "Git", "GitHub Actions",
    ],
  },
  {
    title: "Web & Cloud",
    items: [
      "React", "Leaflet", "Node.js", "Express", "AWS Athena", "Lambda",
      "Glue", "Redshift", "SageMaker", "S3", "Excel",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-ink/10">
      <div className="container-page">
        <p className="section-label mb-3">Skills</p>
        <h2 className="mb-12 text-2xl font-bold sm:text-3xl">What I work with</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
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
