export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-ink-soft sm:flex-row">
        <p>&copy; 2026 Sakshi Nair. Built with React, Vite &amp; Tailwind CSS.</p>
        <div className="flex gap-6">
          <a href="mailto:sakshinair086@gmail.com" className="hover:text-accent">
            Email
          </a>
          <a href="https://linkedin.com/in/sakshinair27" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href="https://github.com/sakshinair27" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
