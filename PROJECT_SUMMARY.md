# St. Paul UCC Website - Project Summary

**Project:** Webflow to Next.js Rebuild  
**Date:** October 2025  
**Status:** ✅ Production Ready  
**Deployment:** Vercel (root directory: `stpaul/`)

---

## 📋 Project Overview

This is a complete rebuild of the St. Paul United Church of Christ website, converting from a Webflow-exported static site to a modern Next.js 15 application. The primary goal was to achieve **pixel-perfect visual fidelity** with the original Webflow design while creating a maintainable, deployable codebase on Vercel.

### Original Stack
- Webflow (design + export)
- Static HTML/CSS/JS
- 14,000+ line `webflow.js` file
- jQuery dependencies

### New Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Original Webflow CSS (preserved as-is)
- **Interactions:** Custom lightweight JavaScript (~50 lines total)
- **Deployment:** Vercel
- **Package Manager:** npm

---

## 🎯 Key Architectural Decisions

### 1. CSS Strategy: Preserve, Don't Rewrite
**Decision:** Load all original Webflow CSS files unchanged via `<link>` tags.

**Why:**
- Guaranteed pixel-perfect fidelity
- Avoids CSS conversion errors
- Faster development (no need to reverse-engineer styles)
- All Webflow classes work exactly as designed

**Implementation:**
- CSS files in `/public/css/`: `normalize.css`, `components.css`, `st-paul-ucc.css`
- Loaded in `layout.tsx` as external stylesheets
- Custom overrides only in `globals.css` (mobile nav, responsive fixes)

### 2. JavaScript Strategy: Simplify Radically
**Decision:** Remove the 14,000-line `webflow.js` file and replace with minimal custom code.

**Why:**
- **Original problem:** Webflow.js animations hid content with `opacity:0` inline styles that never unhid without proper initialization
- **React conflict:** Webflow's jQuery-based DOM manipulation conflicted with React's hydration
- **Form errors:** Webflow.js threw console errors about improperly configured forms
- **Maintainability:** 14k lines of minified code is impossible to debug or modify

**Solution:**
1. **Removed all animation-related attributes** from source JSX:
   - Stripped `data-w-id` attributes (16,420 characters removed across 8 files)
   - Removed inline `opacity:0` and `transform` styles
   - Content now immediately visible, no JavaScript required

2. **Created custom mobile nav handler** (`MobileMenuHandler.tsx`, ~50 lines):
   - Uses native DOM APIs
   - Toggles `data-nav-menu-open` attribute (required by Webflow CSS)
   - Zero dependencies
   - Works perfectly with React's lifecycle

**Trade-off:** Lost scroll-triggered animations from original site. **Accepted** because:
- Content visibility > animations
- Simpler = more maintainable
- Visual design fully preserved (the primary goal)

### 3. Content Strategy: Visible by Default
**Decision:** All content renders immediately, no animation delays.

**Why:**
- SEO: Search engines see all content
- Accessibility: No JavaScript required for content access
- Performance: Faster perceived load time
- Reliability: Content always visible, even if JS fails

---

## 📁 Critical Files & What They Do

### Core Application
```
stpaul/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Header, Footer, global scripts)
│   │   ├── globals.css         # Custom CSS overrides (mobile nav, responsive)
│   │   ├── page.tsx            # Homepage
│   │   ├── calendar/           # Calendar page with Google Calendar embed
│   │   ├── worship-spiritual-life/
│   │   ├── community-outreach/
│   │   ├── contact-us/         # Contact form (client component)
│   │   ├── leadership/         # Leadership profiles
│   │   ├── special-music/      # Music events and galleries
│   │   ├── licensing/          # Image licensing info
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts    # Contact form API endpoint
│   └── components/
│       ├── Header.tsx          # Global navigation (client component)
│       ├── Footer.tsx          # Global footer
│       └── MobileMenuHandler.tsx  # Mobile menu toggle logic
├── public/
│   ├── css/                    # Original Webflow CSS (DO NOT MODIFY)
│   │   ├── normalize.css
│   │   ├── components.css
│   │   └── st-paul-ucc.css
│   └── images/                 # All site images (249 files)
├── next.config.ts              # Redirects for legacy .html URLs
└── package.json                # Dependencies
```

### Key Files Explained

#### `src/app/layout.tsx`
- **Purpose:** Root layout for entire site
- **Contains:** Header, Footer, global CSS, font loading, Webflow init snippet
- **Important:** Loads CSS in specific order (normalize → components → st-paul-ucc)
- **Scripts:** Minimal Webflow init for CSS classes (`w-mod-js`, `w-mod-touch`)

#### `src/app/globals.css`
- **Purpose:** Custom CSS overrides only
- **Contains:**
  - Navigation compression for screens 992-1199px (prevents wrapping)
  - Mobile menu styling when `data-nav-menu-open` is active
  - Responsive breakpoints: 991px, 767px, 479px
- **Critical value:** `padding: 16px` at line 13-14 (manually tuned, don't override!)

#### `src/components/MobileMenuHandler.tsx`
- **Purpose:** Make mobile hamburger menu work
- **How it works:**
  - Listens for click on `.menu-button`
  - Toggles `data-nav-menu-open` attribute on `.nav-menu-2`
  - Toggles `.w--open` class on button (changes color)
  - Auto-closes menu when nav links clicked
- **Why it exists:** Webflow CSS requires `data-nav-menu-open` to display menu

#### `src/app/api/contact/route.ts`
- **Purpose:** Handle contact form submissions
- **Current state:** Validates input, logs to console
- **TODO:** Add email integration (see Future Tasks section)

#### `next.config.ts`
- **Purpose:** Configure redirects for legacy URLs
- **Important:** All `.html` URLs (e.g., `/calendar.html`) redirect to clean URLs (`/calendar`)
- **SEO:** 301 permanent redirects preserve search rankings

---

## 🐛 Problems Solved

### Problem 1: Hidden Content
**Symptom:** Pages loaded with most content invisible (blank sections).

**Root cause:** Webflow animations used inline `opacity:0` styles, expecting `webflow.js` to animate them visible. Without proper initialization, content stayed hidden forever.

**Solution:** 
- Created script to strip all animation attributes from JSX files
- Removed 16,420 characters of inline styles across 8 pages
- Content now visible immediately, no JavaScript required

### Problem 2: Mobile Navigation Not Working
**Symptom:** Hamburger menu clicked but nothing happened.

**Root cause:** Initially used wrong CSS class (`.w--open`). Webflow CSS actually looks for `data-nav-menu-open` attribute to display menu.

**Solution:**
- Created `MobileMenuHandler.tsx` component
- Toggles correct attribute (`data-nav-menu-open`)
- Also toggles `.w--open` class on button for visual feedback

### Problem 3: Mobile Menu Styling Broken
**Symptom:** Mobile menu opened but links displayed as horizontal "chips" instead of vertical stack.

**Root cause:** Desktop styles (inline display, right borders) not overridden for mobile.

**Solution:**
- Added mobile-specific CSS in `globals.css`
- Forces `display: block`, `width: 100%` on nav links
- Removes horizontal borders, adds vertical separators

### Problem 4: Navigation Wrapping on Small Desktops
**Symptom:** At 1024-1200px width, navigation links wrapped to 2 lines.

**Root cause:** Too many nav links for the space with original font/padding.

**Solution:**
- Added media query for 992-1199px screens
- Reduces font from 14px → 12px
- Reduces padding from ~24px → 16px per side
- Keeps desktop nav experience for more users

---

## 🚀 Deployment Information

### Vercel Setup
1. **Repository:** Connected to GitHub
2. **Root Directory:** `stpaul/` (NOT the repo root!)
3. **Framework:** Next.js (auto-detected)
4. **Build Command:** `npm run build` (default)
5. **Install Command:** `npm install` (default)

### Build Verification
```bash
cd stpaul
npm run build
# ✅ Should complete successfully with all pages generated
```

### Environment Variables (Optional)
Currently none required. When email integration is added:
```
RESEND_API_KEY=your_key_here
```

### Domain Setup
- Add custom domain in Vercel dashboard
- SSL automatically configured via Let's Encrypt
- Update DNS records as directed by Vercel

---

## 📝 Future Tasks

### High Priority: Email Integration
**Status:** Contact form works but only logs to console

**Steps to implement:**
1. Choose email service (recommended: [Resend](https://resend.com) - free tier, simple API)
2. Sign up and get API key
3. Add to Vercel environment variables: `RESEND_API_KEY`
4. Uncomment email code in `src/app/api/contact/route.ts`
5. Install dependency: `npm install resend`
6. Deploy (Vercel auto-redeploys on env var change)

**Code already prepared** - just needs API key and uncommenting.

### Medium Priority: Performance Optimization
- Consider converting some `<img>` tags to `<Image />` from `next/image`
- Current warnings don't prevent deployment
- Trade-off: `next/image` optimization vs. exact Webflow HTML parity

### Low Priority: Analytics
- Add Vercel Analytics (one-click enable in dashboard)
- Or integrate Google Analytics if preferred

---

## 🔧 Maintenance Guide

### Updating Content
1. **Text changes:** Edit the relevant `page.tsx` file in `src/app/[page-name]/`
2. **Images:** Add to `public/images/`, reference as `/images/filename.jpg`
3. **Navigation:** Update `src/components/Header.tsx` and `Footer.tsx`

### Adding New Pages
1. Create folder: `src/app/[page-name]/`
2. Add `page.tsx` with content
3. Add metadata for SEO
4. Update navigation in Header/Footer
5. Add redirect in `next.config.ts` if migrating from `.html` URL

### Modifying Styles
**DO NOT modify files in `/public/css/`** - these are the original Webflow CSS and ensure pixel parity.

**DO modify** `src/app/globals.css` for:
- Custom overrides
- Responsive fixes
- New features not in original Webflow design

### Testing
```bash
# Development server
npm run dev

# Production build test
npm run build
npm start

# Clean build (if caching issues)
rm -rf .next
npm run build
```

---

## 🎨 Design System

### Colors
- Primary: `#ef6a40` (orange)
- Background: `#f5f5f5` (light gray)
- Text: `#979593` (gray), `#151822` (dark)
- Accents: White overlays and borders

### Typography
Loaded via Google Fonts:
- **Oswald** (headings): 200, 300, 400, 500, 600, 700
- **Droid Serif** (body)
- **Lato** (UI elements)
- **Open Sans**, **Merriweather**, **Abril Fatface** (special cases)

### Breakpoints
- Desktop: 992px+
- Desktop compressed: 992-1199px (smaller fonts/padding)
- Tablet/Mobile: 991px and below
- Small mobile: 767px and below
- Tiny mobile: 479px and below

---

## 📚 Key Takeaways

### What Worked Well
1. **Preserving original CSS** - Zero visual regressions
2. **Removing Webflow.js** - Simpler, more reliable
3. **Custom mobile nav** - 50 lines vs 14,000 lines
4. **Removing animation styles from source** - Content always visible

### What to Remember
1. **Never modify `/public/css/` files** - breaks pixel parity
2. **The 16px padding in globals.css** - manually tuned, don't change
3. **Webflow requires `data-nav-menu-open`** - not just CSS classes
4. **Vercel root is `stpaul/`** - not the repository root

### If Starting Over
Would do the same approach - preserve CSS, simplify JS, prioritize content visibility over animations. This strategy proved faster and more reliable than alternatives (CSS-in-JS rewrite, React animation libraries, etc.).

---

## 📞 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Original Webflow Site:** Archived in `/archive-site/`
- **This Summary:** Update when making significant changes

---

**Last Updated:** October 15, 2025  
**Next Review:** When adding email integration or making major changes

