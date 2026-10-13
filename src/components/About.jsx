import useReveal from "../hooks/useReveal";

export default function About() {
  const reveal = useReveal();
  return (
    <section id="about" className="section">
      <div className="container-page">
        <div ref={reveal.ref} className={`card grid gap-10 p-7 sm:p-10 lg:grid-cols-[280px_1fr] ${reveal.className}`}>
          <div>
            <p className="section-label mb-3">About</p>
            <h2 className="text-2xl font-bold sm:text-3xl">Systems grounded in verification, not vibes.</h2>
          </div>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              I&rsquo;m an AI/ML and data engineer who likes building intelligent systems that
              actually ship. I&rsquo;m just as comfortable orchestrating a LangGraph agent or
              designing a RAG pipeline as I am writing the FastAPI backend, wiring up the
              pgvector store, and building the React frontend that puts it in someone&rsquo;s
              hands.
            </p>
            <p>
              Most recently I built Juno, a memory-augmented assistant with a LangGraph conflict-
              resolution pipeline and a prompt-injection screen, and MarketPulse AI, a multi-agent
              research pipeline that gates its own output behind human approval. I&rsquo;ve also
              taken a model past the notebook stage — MLflow, FastAPI, Kubernetes, and automated
              drift detection — and built a healthcare RAG system at Heartland Community Network.
              I move comfortably between applied LLM work, production ML, and full-stack
              engineering.
            </p>
            <p>
              I care less about a model that only works in a demo and more about AI that earns
              its keep in production — the messy, practical work of serving it, monitoring it,
              and proving it&rsquo;s still right months later.
            </p>
            <p>
              Currently an AI Consultant at Heartland Community Network, while finishing my M.S.
              in Data Science at Indiana University (GPA 3.9/4.0, May 2026), after an M.S. in
              Applied Statistics from Symbiosis International University and a B.S. in Computer
              Science from Osmania University. Based in Bloomington, IN — open to relocating.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
