import { useEffect } from "react";

/**
 * Updates document.title and the description/OG/Twitter meta tags on route
 * change. Note: this only affects what a JS-executing crawler or a live
 * browser sees — link-preview bots that don't run JS (some LinkedIn/Slack
 * unfurlers) will still see the tags baked into index.html at build time.
 * If per-project social previews turn out to matter, the fix is prerendering
 * (e.g. vite-plugin-ssr or a small prerender script) — not needed for the
 * initial launch since the homepage preview is what's shared most often.
 */
export default function useDocumentHead({ title, description, path = "/" }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    if (title) {
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }
    setMeta('meta[property="og:url"]', "content", `https://www.sakshinair.dev${path}`);
  }, [title, description, path]);
}
