# React Best Practices Audit — Design Spec

**Date:** 2026-03-15
**Scope:** Full best-practices pass across the portfolio site, guided by Vercel React Best Practices and Vercel Composition Patterns.

## Context

This is a React 19 + Vite + Tailwind CSS v4 portfolio SPA. The codebase is small (~15 components) and well-structured, but has several patterns that violate React performance and composition guidelines.

## Changes

### 1. Fix Context Re-renders (CRITICAL)

**File:** `src/components/layout/ThemeProvider.tsx`

**Problem:** The `value` object passed to `ThemeProviderContext.Provider` is recreated every render. The `setTheme` callback is also recreated. This causes every `useTheme()` consumer to re-render when the provider's parent re-renders, even if the theme hasn't changed.

Additionally, the context default value is a valid object, making the error check in `useTheme()` unreachable.

**Changes:**
- Set context default value to `null` (`createContext<ThemeProviderState | null>(null)`)
- Stabilize `setTheme` with `useCallback`
- Memoize the context `value` with `useMemo`
- Migrate `useContext` → React 19 `use()` in the `useTheme` hook
- The error check now properly catches usage outside the provider

**Rules:** `rerender-memo-with-default-value`, `react19-no-forwardref` (for `use()` migration)

### 2. Passive Scroll Listener

**File:** `src/pages/Home.tsx`

**Problem:** The scroll event listener on line 22 does not use `{ passive: true }`. Non-passive scroll listeners block the browser's compositor thread and degrade scroll performance.

**Changes:**
- Add `{ passive: true }` as the third argument to `addEventListener`
- Note: `removeEventListener` does not use the `passive` option — it matches by type and callback reference only

**Rule:** `client-passive-event-listeners`

### 3. Hoist Static Values in Footer

**File:** `src/components/layout/Footer.tsx`

**Problem:** `new Date().getFullYear()` runs every render, creating a new Date object unnecessarily.

**Changes:**
- Hoist `const CURRENT_YEAR = new Date().getFullYear()` to module level

**Rule:** `rendering-hoist-jsx`

### 4. Extract Shared SocialLinks Component

**Files:** `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/About.tsx`

**Problem:** GitHub/LinkedIn link markup is duplicated across three components with slightly different visual treatments (icon buttons in Header, text links in Footer and About).

**Changes:**
- Create `src/components/shared/SocialLinks.tsx`
- The component accepts a `variant` prop: `"icon"` (for Header — renders icon buttons) or `"text"` (for Footer/About — renders text links)
- Move `GitHubIcon` and `LinkedInIcon` SVG constants into this file (hoisted to module level per `rendering-hoist-jsx`)
- Update Header, Footer, and About to use `<SocialLinks variant="icon" />` or `<SocialLinks variant="text" />`

**Rules:** `architecture-avoid-boolean-props` (using explicit variant instead of boolean), `patterns-explicit-variants`

### 5. Remove Dead Code

**Files to delete:**
- `src/components/ui/typewriter-text.tsx` — unused, contains unnecessary `"use client"` directive, has React lint violations (missing `onComplete` in deps)
- `src/components/ui/avatar.tsx` — unused shadcn component
- `src/components/ui/separator.tsx` — unused shadcn component

**Rule:** `bundle-barrel-imports` (reducing unused exports reduces potential for accidental bundling)

### 6. Use `cn()` for Conditional Classes

**File:** `src/components/sections/About.tsx`

**Problem:** Lines 75-77 and 81-83 use template literal ternaries for conditional classNames. The project already has a `cn()` utility (`src/lib/utils.ts`) that wraps `clsx` + `tailwind-merge`.

**Changes:**
- Replace template literal class concatenation with `cn()` calls
- This is a consistency choice — both approaches work correctly, but `cn()` is the established pattern in the project's UI components

**Rule:** Consistency with existing project patterns (no functional improvement, purely stylistic).

## Files Changed Summary

| File | Action |
|------|--------|
| `src/components/layout/ThemeProvider.tsx` | Memoize context value, null default, `use()` |
| `src/pages/Home.tsx` | Add passive listener option |
| `src/components/layout/Header.tsx` | Use SocialLinks component, remove inline SVGs |
| `src/components/layout/Footer.tsx` | Hoist year to module level, use SocialLinks component |
| `src/components/sections/About.tsx` | Use SocialLinks component, use `cn()` |
| `src/components/shared/SocialLinks.tsx` | **New** — shared social links with icon/text variants |
| `src/components/ui/typewriter-text.tsx` | **Delete** |
| `src/components/ui/avatar.tsx` | **Delete** |
| `src/components/ui/separator.tsx` | **Delete** |

## Out of Scope

- Bundle splitting / lazy routes — Vite handles this well enough for a 2-page SPA
- Server-side rules — this is a client-only SPA
- Animation refactoring — motion/react usage is correct (applied to divs, not SVGs)
- Image optimization — static assets served from `/public`, no dynamic images
