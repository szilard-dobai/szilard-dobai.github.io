# Portfolio Site Design

## Overview

A presentational portfolio website for a fullstack software engineer, served via GitHub Pages. Showcases side projects with images, descriptions, and links, plus an about section with experience and skills.

## Stack

- **Vite + React 18 + TypeScript**
- **React Router v7** — client-side routing
- **shadcn/ui** (Tailwind CSS v4) — UI components
- **Motion** (framer-motion) — animations
- **GitHub Pages** — deployment via GitHub Actions

## Site Structure (Hybrid SPA)

### Landing Page (`/`)

1. **Hero section** — name, title ("Fullstack Software Engineer"), tagline, CTA to scroll to projects
2. **Projects grid** — cards with logo, name, one-liner, thumbnail. Click navigates to detail page
3. **About section** — brief intro, skills (tech tags/badges), experience timeline, links (GitHub, LinkedIn, email)
4. **Footer** — minimal, social links

### Project Detail Page (`/projects/:slug`)

- Project name + logo
- One-liner subtitle
- Image gallery (multiple images) or single hero image
- Full description
- Links: live app + GitHub repo
- Back navigation to landing page

## Data Model

```ts
// src/data/projects.ts
type Project = {
  slug: string;
  name: string;
  logo: string;        // path to logo image
  oneLiner: string;
  description: string; // multi-paragraph supported
  images: string[];    // 1+ images, first used as thumbnail
  appUrl: string;
  githubUrl: string;
};
```

Projects defined as a TypeScript array in a config file — no backend, no CMS. Adding a project = adding an object to the array + dropping images in `public/`.

## Animations (Motion)

- Staggered fade-in for project cards on scroll
- Page transitions between landing and detail pages
- Subtle hover effects on cards and buttons
- Gallery image transitions

## Theme

- **Dark/light toggle** using shadcn's built-in theme provider
- Neutral color palette (shadcn zinc/slate)
- Modern/minimalistic aesthetic

## Key shadcn Components

- `Card` — project cards
- `Button` — CTAs and links
- `Badge` — skill tags
- `Dialog` or carousel — image gallery on detail page
- `Separator`, `Avatar` — about section structure

## GitHub Pages Deployment

- GitHub Actions workflow: build on push to `master`, deploy to `gh-pages`
- `404.html` redirect for SPA client-side routing support
- Vite `base` configured for `szilard-dobai.github.io`

## Routing

| Path | View |
|------|------|
| `/` | Landing page (hero + projects grid + about) |
| `/projects/:slug` | Project detail page |

## File Structure

```
src/
  components/
    layout/         # Header, Footer, ThemeToggle
    sections/       # Hero, ProjectsGrid, About
    project/        # ProjectCard, ProjectDetail, ImageGallery
    ui/             # shadcn components
  data/
    projects.ts     # Project data array
  pages/
    Home.tsx        # Landing page
    ProjectPage.tsx # Detail page
  lib/
    utils.ts        # shadcn utility (cn)
  App.tsx
  main.tsx
public/
  projects/         # Project images organized by slug
```
