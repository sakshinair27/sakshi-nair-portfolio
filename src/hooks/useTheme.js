import { useEffect, useState } from "react";

/**
 * Reads/writes the "dark" class on <html>. Initial value is set synchronously
 * by an inline script in index.html (see the <head> script there) so there's
 * no flash of the wrong theme on first paint — this hook just keeps React's
 * state in sync with that and persists future toggles to localStorage.
 */
export default function useTheme() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist
    }
  }, [isDark]);

  return [isDark, setIsDark];
}
