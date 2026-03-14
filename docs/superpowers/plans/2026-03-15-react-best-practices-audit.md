# React Best Practices Audit — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix React anti-patterns and composition issues across the portfolio site, guided by Vercel React Best Practices and Vercel Composition Patterns.

**Architecture:** Five targeted changes — memoize context, passive listeners, extract shared SocialLinks component (includes Footer year hoist), remove dead code, consistent `cn()` usage. No new dependencies. No structural changes to routing or pages.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, motion/react

**Spec:** `docs/superpowers/specs/2026-03-15-react-best-practices-audit-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/layout/ThemeProvider.tsx` | Modify | Memoize context value, null default, `use()` |
| `src/pages/Home.tsx` | Modify | Passive scroll listener |
| `src/components/layout/Footer.tsx` | Modify | Hoist year, use SocialLinks |
| `src/components/shared/SocialLinks.tsx` | Create | Shared social links with icon/text variants |
| `src/components/layout/Header.tsx` | Modify | Use SocialLinks, remove inline SVGs |
| `src/components/sections/About.tsx` | Modify | Use SocialLinks, use `cn()` |
| `src/components/ui/typewriter-text.tsx` | Delete | Unused component |
| `src/components/ui/avatar.tsx` | Delete | Unused component |
| `src/components/ui/separator.tsx` | Delete | Unused component |

---

## Chunk 1: Performance Fixes

### Task 1: Fix Context Re-renders in ThemeProvider

**Files:**
- Modify: `src/components/layout/ThemeProvider.tsx`

- [ ] **Step 1: Update ThemeProvider with memoized context value**

Replace the entire file content with:

```tsx
import { createContext, use, useCallback, useEffect, useMemo, useState } from "react"

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

const ThemeProviderContext = createContext<ThemeProviderState | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
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

  const setTheme = useCallback(
    (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)
    },
    [storageKey]
  )

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = use(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

- [ ] **Step 2: Verify the app builds and theme toggling still works**

Run: `npx tsc -b && npx vite build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/ThemeProvider.tsx
git commit -m "perf: memoize ThemeProvider context value and migrate to React 19 use()"
```

---

### Task 2: Add Passive Scroll Listener

**Files:**
- Modify: `src/pages/Home.tsx:22`

- [ ] **Step 1: Add `{ passive: true }` to the scroll addEventListener**

In `src/pages/Home.tsx`, change line 22 from:

```tsx
    window.addEventListener("scroll", handleScroll)
```

to:

```tsx
    window.addEventListener("scroll", handleScroll, { passive: true })
```

- [ ] **Step 2: Verify build**

Run: `npx tsc -b && npx vite build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "perf: use passive scroll listener in Home page"
```

---

## Chunk 2: Composition & Cleanup

### Task 3: Create Shared SocialLinks Component (includes Footer year hoist)

**Files:**
- Create: `src/components/shared/SocialLinks.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Create the SocialLinks component**

Create `src/components/shared/SocialLinks.tsx`:

```tsx
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/data/about"

const GitHubIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedInIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

type SocialLinksProps = {
  variant: "icon" | "text"
  className?: string
}

export function SocialLinks({ variant, className }: SocialLinksProps) {
  if (variant === "icon") {
    return (
      <div className={className}>
        <Button variant="ghost" size="icon" asChild>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            {GitHubIcon}
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            {LinkedInIcon}
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        GitHub
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        LinkedIn
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Update Header to use SocialLinks**

Replace the entire content of `src/components/layout/Header.tsx` with:

```tsx
import { Link, useLocation } from "react-router";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-primary font-mono me-2">&lt;/&gt;</span>SZILARD
          DOBAI
        </Link>
        <nav className="flex items-center gap-6">
          {isHome && (
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#projects"
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg px-3 py-2 transition-colors"
              >
                Projects
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg px-3 py-2 transition-colors"
              >
                About
              </a>
            </div>
          )}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <SocialLinks variant="icon" className="hidden sm:flex items-center gap-1" />
          </div>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Update Footer to use SocialLinks**

Replace the entire content of `src/components/layout/Footer.tsx` with:

```tsx
import { SocialLinks } from "@/components/shared/SocialLinks"

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground font-medium">
          &copy; {CURRENT_YEAR} Szilard Dobai
        </p>
        <SocialLinks variant="text" className="flex items-center gap-4" />
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Update About to use SocialLinks**

In `src/components/sections/About.tsx`, replace the import line:

```tsx
import { aboutText, experience, skills, socialLinks } from "@/data/about";
```

with:

```tsx
import { aboutText, experience, skills } from "@/data/about";
import { SocialLinks } from "@/components/shared/SocialLinks";
```

Then replace the social links div (lines 41-58):

```tsx
            <div className="flex items-center gap-4 mt-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
```

with:

```tsx
            <SocialLinks variant="text" className="flex items-center gap-4 mt-2" />
```

- [ ] **Step 5: Verify build**

Run: `npx tsc -b && npx vite build`
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/SocialLinks.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/sections/About.tsx
git commit -m "refactor: extract shared SocialLinks component with icon/text variants"
```

---

### Task 4: Use `cn()` for Conditional Classes in About

**Files:**
- Modify: `src/components/sections/About.tsx`

**Note:** Line numbers below reference the file *after* Task 3 has modified it. Use the code snippets for matching, not line numbers.

- [ ] **Step 1: Add `cn` import**

In `src/components/sections/About.tsx`, add after the existing imports:

```tsx
import { cn } from "@/lib/utils";
```

- [ ] **Step 2: Replace template literal ternaries with `cn()`**

Replace the timeline dot div:

```tsx
                  <div
                    className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background ${
                      index === 0 ? "bg-primary" : "bg-border"
                    }`}
                  />
```

with:

```tsx
                  <div
                    className={cn(
                      "absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background",
                      index === 0 ? "bg-primary" : "bg-border"
                    )}
                  />
```

Replace the period span:

```tsx
                    <span
                      className={`text-sm font-medium ${
                        index === 0 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
```

with:

```tsx
                    <span
                      className={cn(
                        "text-sm font-medium",
                        index === 0 ? "text-primary" : "text-muted-foreground"
                      )}
                    >
```

- [ ] **Step 3: Verify build**

Run: `npx tsc -b && npx vite build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "refactor: use cn() for conditional classes in About section"
```

---

### Task 5: Remove Dead Code

**Files:**
- Delete: `src/components/ui/typewriter-text.tsx`
- Delete: `src/components/ui/avatar.tsx`
- Delete: `src/components/ui/separator.tsx`

- [ ] **Step 1: Delete unused components**

```bash
rm src/components/ui/typewriter-text.tsx
rm src/components/ui/avatar.tsx
rm src/components/ui/separator.tsx
```

- [ ] **Step 2: Verify no imports reference deleted files**

Run: `npx tsc -b && npx vite build`
Expected: Build succeeds (confirms no file imports these components).

- [ ] **Step 3: Commit**

```bash
git add -u src/components/ui/typewriter-text.tsx src/components/ui/avatar.tsx src/components/ui/separator.tsx
git commit -m "chore: remove unused typewriter, avatar, and separator components"
```

---

## Final Verification

- [ ] **Run full build:** `npx tsc -b && npx vite build`
- [ ] **Run dev server:** `npx vite` — manually verify:
  - Theme toggle works (dark/light switching)
  - Scroll position restores when navigating back to home
  - Social links appear in header (icons), footer (text), and about section (text)
  - Project cards link to detail pages correctly
  - All animations still work
