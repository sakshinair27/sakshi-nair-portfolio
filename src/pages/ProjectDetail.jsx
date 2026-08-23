import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProjectBySlug } from "../data/projects.jsx";
import useDocumentHead from "../hooks/useDocumentHead";
import NavAnchor from "../components/NavAnchor";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useDocumentHead(
    project
      ? {
          title: `${project.title} — Sakshi Nair`,
          description: project.description,
          path: `/projects/${project.slug}`,
        }
      : {}
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <main id="main">
      <section className="section !pb-10">
        <div className="container-page">
          <NavAnchor id="projects" className="text-sm font-semibold text-accent hover:underline">
            &larr; Back to projects
          </NavAnchor>
          <p className="section-label mt-6 mb-3">{project.category}</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">{project.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <ProjectLinks project={project} />
          </div>
        </div>
      </section>

      <section className="section border-t border-ink/10 bg-surface !pt-12">
        <div className="container-page grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 font-heading text-xl font-bold">The problem</h2>
              <p className="leading-relaxed text-ink-soft">{project.problem}</p>
            </div>
            <div>
              <h2 className="mb-3 font-heading text-xl font-bold">My approach</h2>
              <p className="leading-relaxed text-ink-soft">{project.approach}</p>
            </div>
            <div>
              <h2 className="mb-3 font-heading text-xl font-bold">What I found &amp; fixed</h2>
              <p className="leading-relaxed text-ink-soft">{project.finding}</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-ink-soft">Key result</h3>
              <div className="stat-metric">
                <p className="font-heading text-xl font-bold text-ink">{project.metricValue}</p>
                <p className="mt-1 text-sm text-ink-soft">{project.metricLabel}</p>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-ink-soft">My role</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{project.role}</p>
            </div>
            <div className="card p-6">
              <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-ink-soft">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section border-t border-ink/10">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-bold">Want the details?</h2>
            <p className="mt-1 text-ink-soft">Full code, docs, and commit history are on GitHub.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ProjectLinks project={project} />
            <NavAnchor id="projects" className="btn-secondary">
              See other projects
            </NavAnchor>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectLinks({ project }) {
  return (
    <>
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Live demo ↗
        </a>
      )}
      {project.repoUrl ? (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          GitHub ↗
        </a>
      ) : (
        <span className="text-sm text-ink-soft">Repository access available on request — see Contact.</span>
      )}
    </>
  );
}
