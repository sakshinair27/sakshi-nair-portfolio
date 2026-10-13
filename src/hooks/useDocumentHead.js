import { useEffect } from "react";

const SITE_URL = "https://sakshi-nair-portfolio.vercel.app";

function setMeta(selector, attr, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Updates document.title and the description/OG/Twitter meta tags for the
 * current route. Falls back to whatever is already in index.html for any
 * field not provided.
 */
export default function useDocumentHead({ title, description, path } = {}) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    if (title) {
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[name="twitter:title"]', "content", title);
    }
    if (path) {
      setMeta('meta[property="og:url"]', "content", `${SITE_URL}${path}`);
    }
  }, [title, description, path]);
}
