import { useLocation, useNavigate } from "react-router-dom";

/**
 * A nav link that scroll-links to a section on the homepage — works whether
 * you're already on "/" (smooth-scrolls in place) or on a project detail page
 * (navigates home first, then Home.jsx scrolls to the hash on mount).
 */
export default function NavAnchor({ id, children, className, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate();
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <a href={`/#${id}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
