# Portfolio Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a hybrid SPA portfolio site that showcases side projects with image galleries, descriptions, and links, plus an about section — deployed to GitHub Pages.

**Architecture:** Vite + React SPA with React Router for client-side routing. Landing page with hero, project grid, and about sections. Project detail pages at `/projects/:slug`. Data stored in a TypeScript config file. Dark/light theme toggle via shadcn theme provider.

**Tech Stack:** Vite, React 18, TypeScript, React Router v7, shadcn/ui (Tailwind CSS v4), Motion (framer-motion), GitHub Pages

**Design doc:** `docs/plans/2026-02-28-portfolio-site-design.md`

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`

**Step 1: Create Vite project in the current directory**

Since the repo already exists with files, initialize Vite into a temp directory and move files:

```bash
cd /Users/szilarddobai/Projects/szilard-dobai.github.io
npm create vite@latest temp-scaffold -- --template react-ts
```

Move all scaffold files (except `.git`, `docs`, `README.md`) from `temp-scaffold/` into the root:

```bash
cp -r temp-scaffold/* .
cp temp-scaffold/.gitignore .
rm -rf temp-scaffold
```

**Step 2: Install dependencies**

```bash
npm install
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts on `http://localhost:5173`

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React TypeScript project"
```

---

### Task 2: Install and configure Tailwind CSS + shadcn/ui

**Files:**
- Modify: `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `src/index.css`
- Create: `components.json`, `src/lib/utils.ts`

**Step 1: Install Tailwind CSS v4 with Vite plugin**

```bash
npm install tailwindcss @tailwindcss/vite
```

**Step 2: Install @types/node for path resolution**

```bash
npm install -D @types/node
```

**Step 3: Update `vite.config.ts`**

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 4: Replace `src/index.css` content**

```css
@import "tailwindcss";
```

**Step 5: Configure TypeScript path aliases**

Add to `tsconfig.json` compilerOptions:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Add the same `baseUrl` and `paths` to `tsconfig.app.json` compilerOptions.

**Step 6: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Zinc
- CSS variables: Yes

This creates `components.json` and `src/lib/utils.ts`.

**Step 7: Add core shadcn components**

```bash
npx shadcn@latest add button card badge separator avatar dialog
```

**Step 8: Verify Tailwind works**

Replace `src/App.tsx` temporarily with:
```tsx
function App() {
  return <div className="text-4xl font-bold p-8">Tailwind works!</div>
}
export default App
```

Run `npm run dev` and confirm styled text appears.

**Step 9: Commit**

```bash
git add -A
git commit -m "chore: configure Tailwind CSS v4 and shadcn/ui"
```

---

### Task 3: Install React Router and Motion

**Files:**
- Modify: `package.json`

**Step 1: Install React Router**

```bash
npm install react-router
```

**Step 2: Install Motion**

```bash
npm install motion
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install React Router and Motion"
```

---

### Task 4: Set up routing and layout shell

**Files:**
- Create: `src/pages/Home.tsx`, `src/pages/ProjectPage.tsx`
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/ThemeProvider.tsx`, `src/components/layout/ThemeToggle.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`

**Step 1: Create ThemeProvider**

`src/components/layout/ThemeProvider.tsx`:
```tsx
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme: (theme: Theme) => {
          localStorage.setItem(storageKey, theme)
          setTheme(theme)
        },
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

**Step 2: Create ThemeToggle**

`src/components/layout/ThemeToggle.tsx`:
```tsx
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/layout/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

Note: `lucide-react` is installed by shadcn automatically.

**Step 3: Create Header**

`src/components/layout/Header.tsx`:
```tsx
import { Link } from "react-router"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          SD
        </Link>
        <nav className="flex items-center gap-4">
          <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
```

**Step 4: Create Footer**

`src/components/layout/Footer.tsx`:
```tsx
export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex items-center justify-center px-4 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Szilard Dobai
      </div>
    </footer>
  )
}
```

**Step 5: Create placeholder pages**

`src/pages/Home.tsx`:
```tsx
export default function Home() {
  return <div className="container mx-auto px-4 py-16">Home</div>
}
```

`src/pages/ProjectPage.tsx`:
```tsx
import { useParams } from "react-router"

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  return <div className="container mx-auto px-4 py-16">Project: {slug}</div>
}
```

**Step 6: Set up App with routing and layout**

`src/App.tsx`:
```tsx
import { Routes, Route } from "react-router"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import Home from "@/pages/Home"
import ProjectPage from "@/pages/ProjectPage"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
```

**Step 7: Update main.tsx with BrowserRouter and ThemeProvider**

`src/main.tsx`:
```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
```

**Step 8: Verify routing works**

Run `npm run dev`. Visit `/` and `/projects/test-slug`. Verify header, footer, and theme toggle render. Toggle dark/light mode.

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: set up routing, layout shell, and theme toggle"
```

---

### Task 5: Create project data model and sample data

**Files:**
- Create: `src/data/projects.ts`
- Create: `public/projects/` directory with placeholder images

**Step 1: Create the data file**

`src/data/projects.ts`:
```ts
export type Project = {
  slug: string
  name: string
  logo: string
  oneLiner: string
  description: string
  images: string[]
  appUrl: string
  githubUrl: string
}

export const projects: Project[] = [
  {
    slug: "project-one",
    name: "Project One",
    logo: "/projects/project-one/logo.svg",
    oneLiner: "A short description of what this project does",
    description:
      "A longer description that explains the project in more detail. This can span multiple sentences and describe the tech stack, motivation, and key features.",
    images: [
      "/projects/project-one/screenshot-1.png",
      "/projects/project-one/screenshot-2.png",
    ],
    appUrl: "https://example.com",
    githubUrl: "https://github.com/example/project-one",
  },
  {
    slug: "project-two",
    name: "Project Two",
    logo: "/projects/project-two/logo.svg",
    oneLiner: "Another project with a catchy one-liner",
    description:
      "Another detailed description. The user will replace these placeholder entries with real project data, including actual screenshots and descriptions.",
    images: ["/projects/project-two/screenshot-1.png"],
    appUrl: "https://example.com",
    githubUrl: "https://github.com/example/project-two",
  },
]
```

**Step 2: Create placeholder image directories**

```bash
mkdir -p public/projects/project-one public/projects/project-two
```

Generate simple placeholder SVGs so the UI doesn't break:

`public/projects/project-one/logo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#3b82f6"/><text x="32" y="38" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">P1</text></svg>
```

`public/projects/project-two/logo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#8b5cf6"/><text x="32" y="38" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif">P2</text></svg>
```

Create placeholder screenshot PNGs (or simple SVGs that simulate screenshots):

`public/projects/project-one/screenshot-1.png` — use a 1200x800 placeholder (generate with an SVG or use a solid-color PNG).

For now, create SVG placeholders named with `.png` extension or actual small placeholder images. The simplest approach: create placeholder SVG files for screenshots too.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add project data model and placeholder data"
```

---

### Task 6: Build Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/pages/Home.tsx`

**Step 1: Create Hero component**

`src/components/sections/Hero.tsx`:
```tsx
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Szilard Dobai
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Fullstack Software Engineer
        </p>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Building things for the web. Here are some of my recent projects.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12"
      >
        <Button variant="ghost" size="icon" asChild>
          <a href="#projects">
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </Button>
      </motion.div>
    </section>
  )
}
```

**Step 2: Add Hero to Home page**

`src/pages/Home.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero"

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
```

**Step 3: Verify Hero renders**

Run `npm run dev`. Verify the hero section shows with animation on page load.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with Motion animations"
```

---

### Task 7: Build ProjectCard and ProjectsGrid

**Files:**
- Create: `src/components/project/ProjectCard.tsx`, `src/components/sections/ProjectsGrid.tsx`
- Modify: `src/pages/Home.tsx`

**Step 1: Create ProjectCard component**

`src/components/project/ProjectCard.tsx`:
```tsx
import { Link } from "react-router"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.slug}`}>
        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-foreground/20">
          <div className="aspect-video overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-8 w-8 rounded-md"
              />
              <h3 className="font-semibold">{project.name}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.oneLiner}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
```

**Step 2: Create ProjectsGrid component**

`src/components/sections/ProjectsGrid.tsx`:
```tsx
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/project/ProjectCard"

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-12">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Add ProjectsGrid to Home**

Update `src/pages/Home.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
    </>
  )
}
```

**Step 4: Verify projects grid renders**

Run `npm run dev`. Verify project cards appear with staggered fade-in animation on scroll.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ProjectCard and ProjectsGrid with staggered animations"
```

---

### Task 8: Build About section

**Files:**
- Create: `src/components/sections/About.tsx`, `src/data/about.ts`
- Modify: `src/pages/Home.tsx`

**Step 1: Create about data file**

`src/data/about.ts`:
```ts
export type Experience = {
  role: string
  company: string
  period: string
  description: string
}

export const skills: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Git",
]

export const experience: Experience[] = [
  {
    role: "Fullstack Software Engineer",
    company: "Company Name",
    period: "2023 — Present",
    description: "Brief description of your role and key accomplishments.",
  },
  {
    role: "Software Engineer",
    company: "Previous Company",
    period: "2021 — 2023",
    description: "Brief description of your role and key accomplishments.",
  },
]

export const aboutText =
  "A fullstack software engineer who enjoys building useful things. Placeholder text — replace with your own bio."

export const socialLinks = {
  github: "https://github.com/szilard-dobai",
  linkedin: "https://linkedin.com/in/szilard-dobai",
  email: "mailto:your@email.com",
}
```

**Step 2: Create About component**

`src/components/sections/About.tsx`:
```tsx
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { skills, experience, aboutText, socialLinks } from "@/data/about"

export function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">About</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {aboutText}
          </p>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={`${exp.company}-${exp.period}`}>
                <div className="flex items-baseline justify-between">
                  <h4 className="font-medium">{exp.role}</h4>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2"
        >
          <Button variant="ghost" size="icon" asChild>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={socialLinks.email}>
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 3: Add About to Home**

Update `src/pages/Home.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"
import { About } from "@/components/sections/About"

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <About />
    </>
  )
}
```

**Step 4: Verify About section renders**

Run `npm run dev`. Scroll down to About. Verify skills badges, experience timeline, and social links render with animations.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add About section with skills, experience, and social links"
```

---

### Task 9: Build Project Detail page with image gallery

**Files:**
- Modify: `src/pages/ProjectPage.tsx`
- Create: `src/components/project/ImageGallery.tsx`

**Step 1: Create ImageGallery component**

`src/components/project/ImageGallery.tsx`:
```tsx
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ImageGalleryProps = {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const showPrev = () =>
    setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  const showNext = () =>
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null))

  return (
    <>
      <div className="grid gap-4">
        {/* Main image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer overflow-hidden rounded-lg border"
          onClick={() => setSelectedIndex(0)}
        >
          <img
            src={images[0]}
            alt={alt}
            className="w-full object-cover"
          />
        </motion.div>

        {/* Thumbnail strip (if multiple images) */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <motion.button
                key={image}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedIndex(index)}
                className="flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors hover:border-foreground/40 data-[active=true]:border-foreground"
                data-active={selectedIndex === index}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="h-20 w-32 object-cover"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none">
          <VisuallyHidden>
            <DialogTitle>{alt}</DialogTitle>
          </VisuallyHidden>
          <div className="relative flex items-center justify-center">
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={showPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

            <AnimatePresence mode="wait">
              {selectedIndex !== null && (
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={`${alt} ${selectedIndex + 1}`}
                  className="max-h-[80vh] rounded-lg object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={showNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

**Step 2: Build Project Detail page**

`src/pages/ProjectPage.tsx`:
```tsx
import { useParams, Link, Navigate } from "react-router"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projects } from "@/data/projects"
import { ImageGallery } from "@/components/project/ImageGallery"

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="h-12 w-12 rounded-lg"
          />
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          {project.oneLiner}
        </p>

        <ImageGallery images={project.images} alt={project.name} />

        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <Button asChild>
            <a href={project.appUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live App
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
```

**Step 3: Verify Project Detail page**

Run `npm run dev`. Click a project card. Verify detail page shows with logo, name, one-liner, image gallery (clickable lightbox), description, and links. Verify back button returns to home.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Project Detail page with image gallery lightbox"
```

---

### Task 10: Add page transitions

**Files:**
- Modify: `src/App.tsx`

**Step 1: Wrap Routes with AnimatePresence**

Update `src/App.tsx`:
```tsx
import { Routes, Route, useLocation } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import Home from "@/pages/Home"
import ProjectPage from "@/pages/ProjectPage"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}
```

**Step 2: Verify page transitions**

Navigate between home and project detail. Verify smooth fade transitions.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add page transition animations"
```

---

### Task 11: Polish and responsive design

**Files:**
- Modify: various component files for responsive tweaks

**Step 1: Clean up default Vite files**

Remove `src/App.css` (if still present — it was created by scaffold). Remove `src/assets/` if not needed. Remove any references to `App.css` in imports.

**Step 2: Update `index.html`**

Set the page title and meta description:
```html
<title>Szilard Dobai — Fullstack Software Engineer</title>
<meta name="description" content="Portfolio of Szilard Dobai, a fullstack software engineer." />
```

Also add `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` if not present.

**Step 3: Add smooth scroll behavior to `src/index.css`**

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

html {
  scroll-behavior: smooth;
}
```

Note: The `@custom-variant` line and theme layer may already be present from shadcn init — merge with existing content, don't duplicate.

**Step 4: Test responsive behavior**

Open dev tools, test at mobile (375px), tablet (768px), and desktop (1280px) breakpoints. Verify:
- Hero text scales down on mobile
- Project grid goes to single column on mobile
- About section is readable on mobile
- Header nav is compact on mobile
- Image gallery lightbox works on mobile

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: polish responsive design and clean up scaffold files"
```

---

### Task 12: GitHub Pages deployment setup

**Files:**
- Create: `.github/workflows/deploy.yml`, `public/404.html`
- Modify: `vite.config.ts`

**Step 1: Update Vite config for GitHub Pages base path**

Since this is a user page (`szilard-dobai.github.io`), the base path is `/`. Add it explicitly to `vite.config.ts`:

```ts
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 2: Create 404.html for SPA routing**

`public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol +
          "//" +
          l.hostname +
          (l.port ? ":" + l.port : "") +
          l.pathname
            .split("/")
            .slice(0, 1 + pathSegmentsToKeep)
            .join("/") +
          "/?/" +
          l.pathname
            .slice(1)
            .split("/")
            .slice(pathSegmentsToKeep)
            .join("/")
            .replace(/&/g, "~and~") +
          (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

**Step 3: Add redirect script to `index.html`**

Add this script inside `<head>` of `index.html` (before the closing `</head>`):
```html
<script>
  // Single Page Apps for GitHub Pages
  (function (l) {
    if (l.search[1] === "/") {
      var decoded = l.search
        .slice(1)
        .split("&")
        .map(function (s) {
          return s.replace(/~and~/g, "&");
        })
        .join("?");
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
    }
  })(window.location);
</script>
```

**Step 4: Create GitHub Actions workflow**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 5: Test production build locally**

```bash
npm run build
npx vite preview
```

Verify the site works at the preview URL. Navigate to a project detail page and refresh — verify the 404.html redirect works (this only works on actual GitHub Pages, but verify no build errors).

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: add GitHub Pages deployment workflow and SPA routing"
```

---

### Task 13: Final verification and build

**Step 1: Run production build**

```bash
npm run build
```

Expected: No errors. `dist/` directory created.

**Step 2: Run type checking**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors.

**Step 3: Preview production build**

```bash
npx vite preview
```

Manually test:
- Home page renders (hero, projects, about)
- Theme toggle works
- Project cards link to detail pages
- Image gallery + lightbox works
- Back button works
- Responsive at mobile/tablet/desktop

**Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "chore: final polish and verification"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Scaffold Vite + React + TypeScript |
| 2 | Tailwind CSS + shadcn/ui setup |
| 3 | Install React Router + Motion |
| 4 | Routing + layout shell + theme toggle |
| 5 | Project data model + sample data |
| 6 | Hero section |
| 7 | ProjectCard + ProjectsGrid |
| 8 | About section |
| 9 | Project Detail page + image gallery |
| 10 | Page transitions |
| 11 | Polish + responsive |
| 12 | GitHub Pages deployment |
| 13 | Final verification |
