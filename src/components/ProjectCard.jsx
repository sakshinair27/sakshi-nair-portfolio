import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="card flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="project-index">{project.number}</span>
        <span className="chip">{project.category}</span>
      </div>

      <h3 className="mt-3 font-heading text-lg font-bold sm:text-xl">{project.title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{project.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.cardSummary}</p>
      <p className="mt-3 text-sm">{project.cardMetric}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stackShort.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-5">
        <Link to={`/projects/${project.slug}`} className="btn-secondary !py-2 text-sm">
          Case study
        </Link>
        {project.repoUrl && (
          
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </article>
  );
}
