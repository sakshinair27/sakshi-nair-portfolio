import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

export default function App() {
  // Dark mode only, always — set at runtime too (not just the static class
  // on <html> in index.html) so it still applies even if this app is ever
  // mounted inside a wrapper that doesn't preserve that attribute.
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <CustomCursor />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
