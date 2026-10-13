import { useEffect, useState } from "react";

/**
 * Cycles through `words`, typing each one out, holding briefly, then
 * deleting it before moving to the next. Loops forever. Respects
 * prefers-reduced-motion by just showing the first word, static.
 */
export default function useTypewriter(
  words,
  { typingSpeed = 80, deletingSpeed = 40, pauseTime = 1400 } = {}
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0] ?? "");
      return;
    }

    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, wordIndex, words]);

  return text;
}
