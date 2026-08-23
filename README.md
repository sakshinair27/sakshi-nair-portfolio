# Sakshi Nair — Portfolio (React + Vite + Tailwind)

Same site, now as a real React app: componentized, client-side routed (each project gets its own
URL — `/projects/marketpulse-ai`, etc.), with a dark/light theme toggle. Built for Data Analyst /
Data Engineer / AI-ML Analyst roles.

## Tech stack

- **React 19** + **Vite** — component structure, fast dev server, optimized production build
- **React Router** — client-side routing (`/` and `/projects/:slug`)
- **Tailwind CSS** — same design system as before (colors, fonts, dark mode via CSS variables)
- No backend, no database, no contact-form API — fully static once built

## File structure

```
portfolio-react/
├── index.html                  Vite entry HTML (meta tags, theme anti-flash script, #root)
├── src/
│   ├── main.jsx                React entry point, mounts <App /> inside BrowserRouter
│   ├── App.jsx                 Routes: "/" → Home, "/projects/:slug" → ProjectDetail
│   ├── index.css               Tailwind directives + design tokens (colors, dark mode vars)
│   ├── data/
│   │   └── projects.jsx        ALL project content lives here — edit this file to update projects
│   ├── components/
│   │   ├── Nav.jsx             Sticky nav, theme toggle, resume/contact links
│   │   ├── NavAnchor.jsx       Scroll-to-section link that works cross-page too
│   │   ├── ThemeToggle.jsx     Sun/moon icon button
│   │   ├── Hero.jsx            Homepage hero + stat tiles
│   │   ├── About.jsx
│   │   ├── Projects.jsx        Renders the list of ProjectCards from data/projects.jsx
│   │   ├── ProjectCard.jsx     One numbered project card (homepage)
│   │   ├── Skills.jsx          Skills grouped by category
│   │   ├── Experience.jsx      Work history, education, certifications
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx            Composes all homepage sections
│   │   └── ProjectDetail.jsx   Full case-study page template (reads from data/projects.jsx)
│   └── hooks/
│       ├── useTheme.js         Dark/light mode state + localStorage persistence
│       └── useDocumentHead.js  Updates <title>/meta tags per route (see SEO note below)
├── public/
│   ├── resume/Sakshi_Nair_Resume.pdf
│   ├── images/og-cover.png
│   └── _redirects              Netlify SPA fallback (routes all paths to index.html)
├── vercel.json                 Vercel SPA fallback (same purpose, different platform)
├── tailwind.config.js
└── package.json
```

## Editing content

**To update a project** (or add/remove one): edit `src/data/projects.jsx`. Every project is one
object in that array — the homepage card and the full case-study page both render from it, so you
only edit content in one place.

**To update your bio, skills, or experience**: edit the corresponding component directly —
`src/components/About.jsx`, `src/components/Skills.jsx` (the `SKILL_GROUPS` array), or
`src/components/Experience.jsx` (the `JOBS`, `EDUCATION`, `CERTIFICATIONS` arrays).

**To update your résumé PDF**: replace `public/resume/Sakshi_Nair_Resume.pdf` with the same
filename — no code changes needed.

## Run it locally

```bash
npm install
npm run dev
```

Opens a dev server (usually `http://localhost:5173`) with hot reload — edits to any file show up
instantly in the browser.

## Build for production

```bash
npm run build
```

Outputs a `dist/` folder — this is what actually gets deployed. `npm run preview` serves that
build locally if you want to sanity-check it before deploying.

## Deploy — Vercel (recommended for a Vite app)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import that repo.
3. Vercel auto-detects Vite: build command `npm run build`, output directory `dist`. Leave the
   defaults and click **Deploy**.
4. Live in about a minute, with a free `*.vercel.app` URL. `vercel.json` (already included) makes
   sure refreshing `/projects/commercelens` directly doesn't 404.
5. Every push to `main` auto-redeploys.

## Deploy — Netlify

1. Push this folder to a GitHub repo (or drag-and-drop the `dist/` folder after running
   `npm run build` locally, same as before — but connecting the repo is better here since Netlify
   will then run the build for you on every push).
2. On [netlify.com](https://netlify.com): **Add new site** → **Import an existing project** → pick
   the repo.
3. Build command: `npm run build`. Publish directory: `dist`. Deploy.
4. The included `public/_redirects` file (copied into `dist/` automatically by Vite) handles the
   same direct-URL-refresh problem as Vercel's config.

## Deploy — GitHub Pages

GitHub Pages only serves static files with no server-side rewrite support, so a single-page React
app needs one extra step to avoid 404s on direct links like `/projects/commercelens`. Two options:

**Simplest — build locally, push `dist/`:**
```bash
npm run build
# then push the contents of dist/ to a gh-pages branch, e.g. using the gh-pages package:
npm install -D gh-pages
npx gh-pages -d dist
```
Then in the repo: Settings → Pages → Source → Deploy from branch → `gh-pages` / `/(root)`.

**Better — GitHub Actions builds it on every push.** Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
Then set Settings → Pages → Source → `gh-pages` branch, same as above.

Either way, GitHub Pages doesn't support the SPA-rewrite trick Vercel/Netlify get for free — a
direct visit to a deep link can still 404 unless you add a small 404.html-redirect-to-index.html
trick (search "spa-github-pages" if you hit this). **Vercel or Netlify is the easier path** for
this reason — recommended over GitHub Pages for this project.

## A note on social-link previews (SEO)

Because this is a client-rendered single-page app, the Open Graph/Twitter meta tags baked into
`index.html` describe the **homepage**. `useDocumentHead.js` updates `<title>` and meta tags after
the page loads for anyone in a real browser or a crawler that executes JavaScript (Google does),
but some link-preview bots (certain LinkedIn/Slack unfurlers) fetch raw HTML without running JS —
those will show the homepage's preview image/description even when someone shares a direct link to
a project page. This is a known tradeoff of plain client-side-rendered SPAs.

If per-project social previews matter to you (e.g. you want to share a specific case-study link
and have it preview correctly), the fix is prerendering each route to static HTML at build time —
ask if you want this added; it's a moderate addition (a prerender script or a tool like
`vite-plugin-ssr`), not a quick toggle. The original plain-HTML version of this site (if you still
have it) doesn't have this limitation, since every project page there is genuinely static HTML.

## Pre-launch checklist

- [ ] **Replace placeholder domain** — `index.html` and `useDocumentHead.js` reference
      `https://www.sakshinair.dev/`. Swap for your real deployed URL once you have one.
- [ ] **Add a profile photo** (optional) — insert an `<img>` with a real `alt` attribute into
      `src/components/Hero.jsx` if you want one; none is included by design (content-first).
- [ ] **Live demos** — `demoUrl` is `null` for all 7 projects in `src/data/projects.jsx`. If you
      deploy any project publicly, set its `demoUrl` and a "Live demo ↗" button appears
      automatically on both the card and the case-study page.
- [ ] **Phone number** — not published on the site (your résumé has one; left off to avoid
      scraping). Add it to `src/components/Contact.jsx` if you want it public.
- [ ] **Proofread project case studies** in `src/data/projects.jsx` — written from your résumé and
      GitHub READMEs; skim for accuracy before sending to recruiters.
- [ ] **Test all links** after deploying — GitHub repos, LinkedIn, email, résumé download, and
      clicking through to each of the 7 case-study pages.
- [ ] **Run a Lighthouse check** (Chrome DevTools → Lighthouse) after deploying — a Vite/React
      build like this typically scores well, but it's worth confirming (React does add real JS
      weight compared to the plain-HTML version — ~270KB before gzip — which mostly matters on
      very slow connections; not a concern for a portfolio site under normal use).
