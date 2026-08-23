import { Link } from "react-router-dom";
import NavAnchor from "./NavAnchor";
import ThemeToggle from "./ThemeToggle";

export default function Nav({ isDark, setIsDark }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="font-heading text-lg font-bold text-ink">
          Sakshi Nair
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <NavAnchor id="about" className="nav-link">About</NavAnchor>
          <NavAnchor id="projects" className="nav-link">Projects</NavAnchor>
          <NavAnchor id="skills" className="nav-link">Skills</NavAnchor>
          <NavAnchor id="experience" className="nav-link">Experience</NavAnchor>
          <NavAnchor id="contact" className="nav-link">Contact</NavAnchor>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          <a
            href="/resume/Sakshi_Nair_Resume.pdf"
            download
            className="btn-secondary !px-4 !py-2 hidden sm:inline-flex"
          >
            Resume
          </a>
          <NavAnchor id="contact" className="btn-primary !px-4 !py-2">
            Contact
          </NavAnchor>
        </div>
      </nav>
    </header>
  );
}
