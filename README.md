# Optes — Parameter Intelligence (teaser)

A single-page, zero-dependency teaser for **Optes Parameter Intelligence**: a privately
deployed sensing platform that surfaces the quiet pattern preceding a threat and resolves
many signals into one record you can stand behind — on ground that stays yours.

The page is the argument: a near-black canvas, a single hairline accent, mostly type and
space. Pure HTML and CSS with one tiny vanilla-JS scroll enhancement. No external fonts,
CDNs, analytics, or trackers — everything is self-hosted and offline-capable, in keeping
with the product's sovereign posture. It ships with a strict Content-Security-Policy.

## Deploy on Vercel

Zero configuration — it is a static site.

1. Push this directory to a Git repository.
2. In Vercel, **Add New… → Project** and import the repository.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. **Deploy.** Security headers and asset caching are applied from `vercel.json`.

Preview locally with any static server, e.g. `python3 -m http.server` from this directory.

## Before you go live

Two things to set for your environment:

- **Contact address.** Everything routes to one mailbox: `briefing@optes.ai`. Change it with a
  find-and-replace of `briefing@optes.ai` across `index.html` (the top-bar CTA, hero CTA,
  closing CTA, the CTA hint, and the footer all share the same `mailto:` link).
- **Domain.** The canonical URL, the Open Graph / Twitter URLs and image, plus `robots.txt`
  and `sitemap.xml` assume `https://optes.ai/`. If you launch on a different domain, update
  those occurrences (search for `optes.ai`).

## Social card

`og.png` (1200×630) is the Open Graph / Twitter card referenced by `index.html` — a PNG
because not every social platform rasterizes SVG. `og.svg` is the editable source; after
changing it, regenerate the PNG (any SVG→PNG path works), for example:

    cairosvg og.svg -o og.png -W 1200 -H 630

## A note on the Content-Security-Policy

`vercel.json` ships a strict CSP with no `'unsafe-inline'`. The single inline script in
`index.html` — `document.documentElement.classList.add('js')`, which lets visitors without
JavaScript still see every section — is allow-listed by its SHA-256 hash in `script-src`. If
you change that inline script, recompute the hash and replace the `'sha256-…'` value:

    printf "%s" "document.documentElement.classList.add('js')" | openssl dgst -sha256 -binary | openssl base64

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | Semantic markup: top bar, hero with the SVG signal field, six sections, single CTA, footer. |
| `styles.css` | The design system — palette tokens, fluid type, hairlines, glass-on-chrome, reduced-motion handling. |
| `app.js` | Deferred, dependency-free: top-bar glass-on-scroll + IntersectionObserver reveal. A no-op under reduced motion; never throws. |
| `favicon.svg` | The abstract aperture mark (monochrome + one accent). |
| `og.svg` / `og.png` | 1200×630 social card — SVG source plus the rasterized PNG scrapers use. |
| `vercel.json` | Strict Content-Security-Policy and security headers, plus long-lived caching for static assets. |
| `robots.txt` / `sitemap.xml` | Indexing. |
