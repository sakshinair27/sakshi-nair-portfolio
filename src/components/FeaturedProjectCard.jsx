import { Link } from "react-router-dom";

export default function FeaturedProjectCard({ project }) {
  return (
    <article className="card p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="section-label">{project.number} — Featured</p>
            <span className="chip">{project.category}</span>
          </div>
          <h3 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">{project.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stackShort.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.repoUrl && (
               <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2.5"
              >
                GitHub ↗
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
            >
              Case study →
            </Link>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            {project.stats?.map((stat) => (
              <div key={stat.label} className="stat-metric">
                <p className="font-heading text-2xl font-bold text-ink sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </div>
          {project.note && (
            <p className="mt-5 border-t border-ink/10 pt-4 font-mono text-xs leading-relaxed text-ink-soft">
              {project.note}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
