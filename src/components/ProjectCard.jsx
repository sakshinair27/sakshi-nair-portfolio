import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">
      <span className="project-index">{project.number}</span>
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{project.category}</p>
        <h3 className="mt-1 font-heading text-xl font-bold">{project.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{project.subtitle}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{project.cardSummary}</p>
        <p className="mt-3 text-sm">{project.cardMetric}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stackShort.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 lg:items-end">
        <Link to={`/projects/${project.slug}`} className="btn-secondary w-full !py-2 lg:w-auto">
          Case study
        </Link>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ink-soft hover:text-accent"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </article>
  );
}
