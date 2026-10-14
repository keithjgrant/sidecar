# Framework options for Sidecar

Notes from Oct 2026 on whether Gatsby is still the right fit, given the two original goals: simple MD-based drink editing, and easy offline access.

## What Gatsby is buying today

- **MD drinks** → build-time content pipeline (works well; GraphQL is the tax)
- **Offline** → `gatsby-plugin-offline` / Workbox precache (works, but that plugin is dated — Workbox 4)
- Plus a lot that isn’t strictly needed for a personal cocktail PWA: GraphQL schema, page-data JSON, sharp plugin stack, etc.

Sidecar is already half “content site” and half “client app” (IndexedDB bar, favorites, Help Me Decide). That’s why Gatsby can feel heavier than the original two goals suggest.

## Comparison

| Option | MD editing | Offline/PWA | Fit for Sidecar |
|---|---|---|---|
| **Stay on Gatsby** | Excellent (status quo) | Good enough via existing plugin | Fine if migration cost isn’t worth it |
| **Astro + React islands** | Best DX for MD/MDX | Easy with Vite PWA | Strong default: static drinks, React only where interactive |
| **Vite + React + `vite-plugin-pwa`** | Simple (`gray-matter` / glob import — already a dep) | Best-in-class modern offline | Strong if Sidecar is treated as an app first |
| **Next.js** | Fine | Awkward for offline | Usually overkill here |
| **Eleventy** | Very simple for content | DIY | Poor fit for interactive features |

## Recommendation

- Don’t migrate just because of incidental bugs (e.g. missing `gatsby-plugin-image` in config). Those aren’t a framework indictment.
- If wanting simpler long-term: **Astro** (content-first) or **Vite + React** (app-first). Both keep “edit a `.md` file, rebuild/deploy” and give a cleaner offline story than Gatsby’s plugin.
- Eleventy is simpler for pure content, but a poor match for My Bar / Help Me Decide / similar client features.

**Practical take:** Gatsby is still *valid* for Sidecar; it’s just no longer the *simplest* path to MD + offline. Switch only if GraphQL/build friction is already painful, or if a more maintainable PWA story becomes a priority — not as urgent cleanup.
