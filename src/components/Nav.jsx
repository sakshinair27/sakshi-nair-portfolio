import { Link } from "react-router-dom";
import NavAnchor from "./NavAnchor";

export default function Nav() {
  return (
    <header className="sticky top-4 z-40 px-4">
      <nav
        className="glass mx-auto flex h-14 max-w-content items-center justify-between rounded-full px-5 shadow-[0_1px_0_rgb(255_255_255/0.06)_inset,0_20px_50px_-30px_rgb(0_0_0/0.8)]"
        aria-label="Primary"
      >
        <Link to="/" className="font-heading text-base font-bold text-ink">
          Sakshi Nair
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <NavAnchor id="about" className="nav-link">About</NavAnchor>
          <NavAnchor id="projects" className="nav-link">Projects</NavAnchor>
          <NavAnchor id="skills" className="nav-link">Skills</NavAnchor>
          <NavAnchor id="experience" className="nav-link">Experience</NavAnchor>
          <NavAnchor id="contact" className="nav-link">Contact</NavAnchor>
        </div>
        <NavAnchor id="contact" className="btn-primary !px-4 !py-2 !text-xs">
          Contact
        </NavAnchor>
      </nav>
    </header>
  );
}
