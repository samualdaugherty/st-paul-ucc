# St. Paul’s Church — Pixel‑Perfect Rebuild (Next.js on Vercel)

**Role:** Lead Front‑End Architect + Implementer (inside Cursor).  
**Goal:** Recreate the exported Webflow site **exactly** (visuals, layout, copy, interactions), but as a maintainable Next.js project with shared components and clean routes.  
**Inputs:** This repo’s `archive-site/` folder is the source of truth for HTML/CSS/JS/assets: <https://github.com/samualdaugherty/st-paul-ucc>

**Non‑negotiables**
- **Pixel parity** with the current exported site.  
- **Behavior parity** for nav, dropdowns, interactions, and any embeds.  
- **Shared components** for header, footer, and any repeated UI.  
- **Stable URLs** with redirects from legacy `*.html` to clean routes.  
- No visual regressions. Do **not** refactor styles yet.

---

## 0) Notes on Webflow Exports (what to expect)
- Pages live as root files like `calendar.html`, `about.html`, etc.  
- Global CSS typically resides under `/css/…` with a `*-webflow.css`.  
- JS often includes `jquery.min.js` and `webflow.js` powering interactions (`data-w-id`, `w-nav`, `w-dropdown`, etc.).  
- Images under `/images/…`, sometimes SVGs inline.  
- Webflow forms in static export **do not submit** (they post to Webflow only when hosted there). Preserve markup now; we can wire a provider later if needed.

---

## 1) Target Stack & Principles
- **Framework:** Next.js (App Router) + **TypeScript**  
- **Deploy:** Vercel (preview + prod)  
- **Styling:** Import the **original CSS** unchanged to guarantee pixel match.  
- **Scripts:** Keep original `webflow.js` and `jquery.min.js` (if present) to preserve interactions.  
- **Components:** Extract shared **Header**, **Footer**, **MobileNav** from the HTML.  
- **Routing:** Clean, folder‑based routes (no `.html` in URLs) with 301 redirects from legacy paths.  
- **Images:** Use `<img>` initially to avoid layout shifts. We can switch to `next/image` only if it does not alter rendering.

**Acceptance bar:** side‑by‑side comparison at standard breakpoints yields no visible difference.

---

## 2) Project Setup (generate all files)

```bash
# from project root (create a fresh app folder or use an empty repo)
pnpm create next-app@latest stpaul --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*"
# or: npx create-next-app@latest …
cd stpaul
pnpm add classnames
```

**File tree (starting point)**

```
stpaul/
  app/
    (site)/
      components/
        Header.tsx
        Footer.tsx
        MobileNav.tsx
      # routes will be generated from the HTML filenames
    layout.tsx
    page.tsx        # will become the exported index.html
    globals.css
  public/
    css/
    images/
    js/
    fonts/
  next.config.mjs
  package.json
  README.md
```

---

## 3) Ingest the Export (copy assets verbatim)
From `archive-site/`, mirror the following into `public/`:

- `/css/**` → `public/css/**`  
- `/js/**` → `public/js/**`  
- `/images/**` (and `/img/**` if present) → `public/images/**` (preserve relative path expectations; if CSS references `/images/foo.jpg`, keep that path)  
- Any `/fonts/**` → `public/fonts/**`  
- **Do not** minify/rename files—keep names as‑is to avoid CSS/JS path breakage.

In `app/globals.css`, **import the exported CSS** in the exact order the original HTML includes them (e.g., normalize, base, webflow.css, site.css). Example:

```css
@import url("/css/normalize.css");
@import url("/css/webflow.css");
@import url("/css/stpaul.webflow.css"); /* example */
```

If fonts are linked via Google Fonts in `<head>`, keep the same `<link>` until/unless we self‑host later.

---

## 4) Parse Pages → Define Routes
Scan `archive-site/*.html` and build the **site map**:
- `index.html` → route `/` → file `app/page.tsx`
- `calendar.html` → `/calendar` → `app/calendar/page.tsx`
- `about.html` → `/about` → `app/about/page.tsx`
- Repeat for every top‑level `.html` in the archive.

> If there are directories with nested pages, mirror them 1:1 under `app/<dir>/<page>/page.tsx`.

Create **301 redirects** in `next.config.mjs` from `/<name>.html` → `/<name>` for each legacy page (see §8).

---

## 5) Extract Shared Components
For each HTML file:
1) Open the raw HTML.
2) Identify the **header/nav** (usually `w-nav`, `w-dropdown`, or a `<header>` block) and **footer**.
3) Copy markup **exactly** (classes, IDs, data‑attributes) into `app/(site)/components/Header.tsx` and `Footer.tsx`.

**`app/layout.tsx`**
- Render `<Header/>` above `{children}` and `<Footer/>` below.
- Inject any `<link>` and `<script>` tags that were in the `<head>` (fonts, CSS) and **end of `<body>`** (jQuery, webflow.js) using Next’s `<Script>` component to preserve load order:
  
```tsx
// app/layout.tsx (snippet)
import Script from "next/script";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* font links, meta tags replicated per §7 */}
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        {/* Preserve original script order */}
        <Script src="/js/jquery.min.js" strategy="afterInteractive" />
        <Script src="/js/webflow.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
```

> If the export doesn’t include jQuery/webflow, omit the scripts.

---

## 6) Build Each Route (verbatim DOM)
For every `.html` page:
- Copy the **inner body** markup into the corresponding `app/<route>/page.tsx` component.  
- Keep class names and IDs unchanged; keep inline styles if any.  
- Convert void elements and attributes to JSX‑correct forms (e.g., `class` → `className`, `for` → `htmlFor`, `allowfullscreen` → `allowFullScreen`).  
- Preserve any `<iframe>`, embeds, or third‑party widgets.

**Important:** Webflow interactions rely on attributes like `data-w-id` and classes like `w-dropdown`, `w--open`. Keep them intact so `webflow.js` re‑binds behaviors.

---

## 7) Metadata & Head
For each page, replicate `<title>` and key `<meta>` tags via Next Metadata:
```ts
// app/calendar/metadata.ts (or generateMetadata in page.tsx)
export const metadata = {
  title: "St. Paul's Church – Calendar",
  description: "…",
};
```
If the export includes Open Graph/Twitter tags, set a **default** in `app/layout.tsx` and override per‑page only when needed. Replicate favicons, apple‑touch icons, and manifest under `public/`.

---

## 8) Redirects from Legacy `*.html`
In `next.config.mjs`, add **static redirects** for every exported page:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/calendar.html', destination: '/calendar', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      // …add one for each legacy file
    ];
  },
};
export default nextConfig;
```

Optionally add **rewrites** if external paths must remain but content moves.

---

## 9) QA: Exactness Protocol
1) View at 360, 768, 1024, 1280, 1440 widths.  
2) Flip between original export (open `archive-site/*.html` in a browser) and Next build; check typography, spacing, alignment.  
3) Validate nav dropdowns, mobile menu, tabs, sliders.  
4) Confirm every internal link maps to the new route (no `.html` in hrefs internally).  
5) Ensure images render with original dimensions; avoid CLS.  
6) Lighthouse: 90+ perf/SEO/accessibility (no changes that break visuals).

---

## 10) Forms (Parity First)
If a page contains a form:
- Keep the exact markup and attributes so visuals match.  
- If `action` points to Webflow (non‑functional in export), mark a **TODO** comment to wire it later via Formspree or Vercel Functions. **Do not change behavior** in this pass unless confirmed.

---

## 11) Build Scripts & Deployment
`package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```
- Connect repo to **Vercel**, import, default settings.  
- After preview deploy, open real devices to smoke‑test interactions (especially mobile nav).

---

## 12) Execution Steps (do these now, in order)
1. **Scaffold** the Next project (Section 2).  
2. **Mirror assets** from `archive-site/` into `public/` (Section 3).  
3. **Extract Header/Footer** into components; wire them in `layout.tsx` (Section 5).  
4. **Generate routes** from every `.html` in `archive-site/` (Section 4), migrating DOM into page components.  
5. **Include scripts** (jQuery/webflow) in the same order (Section 5).  
6. **Set metadata** and **redirects** (Sections 7–8).  
7. **QA exactness** and fix any drift (Section 9).  
8. **Preview deploy** on Vercel; verify and iterate.

---

## 13) Deliverables Checklist
- [ ] Header/Footer components match exactly (desktop + mobile).  
- [ ] All pages migrated with pixel parity.  
- [ ] Interactions (nav, dropdowns, tabs, etc.) behave identically.  
- [ ] Redirects from every `/*.html` to clean `/*`.  
- [ ] Metadata/favicons replicated.  
- [ ] Preview URL shared.

---

## 14) Status Reply Template
When the scaffold, header/footer, and first two pages are done, reply in this thread with:

> **Status:** Scaffold complete; Header/Footer implemented; `/` + one inner page matched pixel‑perfect.  
> **Pending:** Remaining routes in progress; redirects staged.  
> **Preview:** <Vercel preview URL>

---

**Begin now.**
