# Design: Legal Pages + Profile Photo

**Date:** 2026-03-27
**Status:** Approved

---

## Overview

Two additions to the AI·Implmnt site:

1. **Three legal pages** — Privacy Policy, Cookie Policy, Terms & Conditions — each matching the main site's brand, navigation, and footer.
2. **Profile photo** — Replace the `.about-photo` placeholder in the About section with Leo's actual photo (`leo.jpg`).

---

## Architecture

### Multi-page Vite

Vite's `build.rollupOptions.input` is updated to include all four HTML files:

```js
input: {
  main: 'index.html',
  privacy: 'privacy.html',
  cookies: 'cookies.html',
  terms: 'terms.html',
}
```

Each legal HTML file imports `/src/main.js` (same entry point, same styles, same nav/mobile menu/scroll behaviour). No new JS is needed.

### File structure

```
ai-implmnt/
  index.html          ← add footer legal links
  privacy.html        ← new
  cookies.html        ← new
  terms.html          ← new
  public/
    leo.jpg           ← profile photo (already added)
  src/
    styles/
      legal.css       ← new: prose layout for legal pages
```

### URL routes (Vercel `cleanUrls: true`)

| File | URL |
|---|---|
| `privacy.html` | `/privacy` |
| `cookies.html` | `/cookies` |
| `terms.html` | `/terms` |

---

## Legal Page Layout

Each page uses the same nav and footer as `index.html`. Content structure:

```
<nav>                    ← identical to main site
<section class="legal-hero">
  <h1>Page Title</h1>
  <p>One-line description</p>
  <p class="legal-updated">Last updated: 27 March 2026</p>
</section>
<section class="legal-body">
  <div class="legal-inner">
    ... prose content ...
    <a href="/">← Back to home</a>
  </div>
</section>
<footer>                 ← identical to main site
```

**CSS (`legal.css`):**
- `.legal-hero` — dark background matching site hero, padding, typography
- `.legal-body` — white/cream background, max-width 720px, 1.7 line-height, generous section spacing
- Uses existing CSS variables (`--ink`, --`cream`, `--signal`, `--syne`, `--dm-sans`)

---

## Legal Content

**Contact:** leo@ai-implmnt.com
**Governing law:** Ireland / EU

### Privacy Policy

Sections:
1. Who we are (Leo Paul Larkin · AI·Implmnt · leo@ai-implmnt.com · Dublin, Ireland)
2. Data we collect — name/email via Calendly booking; anonymous analytics via Vercel Analytics
3. How we use your data — to respond to enquiries and deliver services; to understand site performance
4. Legal basis — Art. 6(1)(b) GDPR (contract/pre-contract) for bookings; Art. 6(1)(f) legitimate interest for analytics
5. Data retention — booking data kept for duration of business relationship + 12 months; analytics data per Vercel's policy
6. Your rights — access, rectification, erasure, portability, restriction, objection
7. Complaints — Data Protection Commission Ireland (dataprotection.ie)
8. Contact — leo@ai-implmnt.com

### Cookie Policy

Sections:
1. What cookies are
2. Cookies used — Vercel Analytics (analytics/performance cookies, no personally identifiable data, no cross-site tracking)
3. How to manage cookies — browser settings, Vercel Analytics opt-out

### Terms & Conditions

Sections:
1. Services — AI guidance and implementation consulting; described at ai-implmnt.com
2. Bookings — via Calendly; confirmed on receipt of payment
3. Payment — invoiced per project or session; due within 14 days
4. Cancellation — 48h notice required for free cancellation of discovery calls
5. Intellectual property — deliverables belong to client on full payment
6. Limitation of liability — capped at fees paid for the relevant engagement
7. Governing law — Republic of Ireland; courts of Ireland have jurisdiction
8. Changes — Leo may update T&Cs; continued use of services constitutes acceptance
9. Contact — leo@ai-implmnt.com

---

## Profile Photo

- File: `public/leo.jpg`
- Location in HTML: `.about-photo-wrap > .about-photo`
- Implementation: replace the empty `.about-photo` div with a div containing an `<img>` tag
- CSS: `img` inside `.about-photo` gets `width:100%; height:100%; object-fit:cover; border-radius` matching the parent

---

## Footer Update (`index.html`)

Add legal links to `footer-bottom`:

```html
<div class="footer-legal-links">
  <a href="/privacy">Privacy</a>
  <span>·</span>
  <a href="/cookies">Cookies</a>
  <span>·</span>
  <a href="/terms">Terms</a>
</div>
```

The same legal links are added to the footer of each legal page.

---

## What Is Not Changing

- No new JS logic (legal pages reuse `main.js` as-is)
- No new dependencies
- No changes to existing CSS files (only adding `legal.css`)
- Mobile menu, nav scroll, animations — all work automatically on legal pages via `main.js`
