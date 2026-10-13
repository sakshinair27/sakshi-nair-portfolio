export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-4">
      <div className="glass mx-auto flex max-w-content flex-col items-center justify-between gap-4 rounded-2xl px-6 py-6 text-sm text-ink-soft sm:flex-row">
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
