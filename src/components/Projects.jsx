import projects from "../data/projects.jsx";
import ProjectCard from "./ProjectCard";
import FeaturedProjectCard from "./FeaturedProjectCard";
import useReveal from "../hooks/useReveal";

export default function Projects() {
  const [featured, ...rest] = projects;
  const reveal = useReveal();

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-3">
          <p className="section-label">01 — 10</p>
          <h2 className="text-2xl font-bold sm:text-3xl">Projects</h2>
          <p className="max-w-2xl text-ink-soft">
            Ten builds spanning agentic AI, multi-tool BI engineering, SQL data warehousing,
            real-time streaming pipelines, applied ML, and production MLOps — each with the
            problem, my approach, and a verified outcome.
          </p>
        </div>

        <FeaturedProjectCard project={featured} />

        <div ref={reveal.ref} className={`mt-6 grid gap-6 sm:grid-cols-2 ${reveal.className}`}>
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
