import projects from "../data/projects.jsx";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="section border-t border-ink/10 bg-surface">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-3">
          <p className="section-label">01 — 07</p>
          <h2 className="text-2xl font-bold sm:text-3xl">Projects</h2>
          <p className="max-w-2xl text-ink-soft">
            Seven builds spanning agentic AI, multi-tool BI engineering, SQL data warehousing, and
            applied ML — each with the problem, my approach, and a verified outcome.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
