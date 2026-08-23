import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import useTheme from "./hooks/useTheme";

export default function App() {
  const [isDark, setIsDark] = useTheme();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Nav isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
