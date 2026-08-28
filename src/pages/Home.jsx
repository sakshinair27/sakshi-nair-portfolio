import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Methodology from "../components/Methodology";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import useDocumentHead from "../hooks/useDocumentHead";

export default function Home() {
  const location = useLocation();

  useDocumentHead({
    title: "Sakshi Nair — Data Analyst & Data Engineer",
    description:
      "I build the verified side of data analytics: BI dashboards audited against SQL ground truth, production-grade PostgreSQL/dbt warehouses, and the ML pipelines feeding them.",
    path: "/",
  });

  // Scroll to the section named in the URL hash (handles nav clicks coming
  // from a project detail page, and direct links like /#projects).
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="main">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
