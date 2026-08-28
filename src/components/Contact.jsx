export default function Contact() {
  return (
    <section id="contact" className="section border-t border-ink/10">
      <div className="container-page">
        <p className="section-label mb-3">Contact</p>
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Let&rsquo;s talk.</h2>
        <p className="mb-10 max-w-xl text-ink-soft">
          Open to Data Analyst, Data Engineer, and AI/ML Analyst roles — graduating May 2026, based
          in Bloomington, IN, open to relocating. Reach out any of these ways:
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:sakshinair086@gmail.com" className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2.94 6.412A2 2 0 002 8.108V14a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l4.5 3a1 1 0 001.11 0l4.5-3a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" />
            </svg>
            sakshinair086@gmail.com
          </a>
          <a href="https://linkedin.com/in/sakshinair27" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            LinkedIn ↗
          </a>
                    <a href="https://github.com/sakshinair27" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
