# Happy Anniversary — Pastel Fan Web

Single-page celebration website built with Next.js App Router, TypeScript, TailwindCSS, and Framer Motion. The page highlights a romantic hero section, countdown, relationship stats, timeline milestones, memory gallery, and a heartfelt letter with smooth, reduced-motion-aware animations.

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```
2. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Core Configuration

All content you are likely to customise lives in `app/config.ts`:

- `START_DATE`: the day the relationship began.
- `ANNIVERSARY_DATE`: the upcoming celebration date (used by the countdown).
- `NAMES`: names (or nickname) to show in the hero headline.
- `HERO_IMAGES`: 3–5 hero photos located inside `public/`.
- `GALLERY_IMAGES`: 6–12 gallery images located inside `public/`.

Replace any placeholder images in `public/` with your own while keeping the filenames or updating the arrays accordingly.

## Styling Guide

- TailwindCSS powers all styling; adjust colours and layouts via utility classes in component files.
- Global helpers (such as `.card`, `.bg-soft`) are defined in `app/globals.css`.
- Typography uses `Noto Sans Thai` for body text and `Sriracha` for accent headings via `next/font/google`.

## Animations & Accessibility

- Framer Motion variants and helpers live in `app/lib/motion.ts`. Every animated component checks `prefers-reduced-motion` to minimise or disable movement when necessary.
- The countdown triggers celebratory confetti (`canvas-confetti`, dynamically imported to keep bundles light) once the anniversary date arrives.
- Timeline, gallery, and content sections animate in on scroll with smooth easing and `viewport` thresholds tuned to avoid jank.

## Deployment

When you're ready to ship:

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

## Notes

- The project is mobile-first and remains performant by keeping dependencies lean and assets local.
- Lighthouse scores should remain high across performance, accessibility, best practices, and SEO as long as your images are optimised.
