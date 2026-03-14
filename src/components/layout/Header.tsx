import { Link, useLocation } from "react-router"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function Header() {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-widest uppercase text-foreground/80 hover:text-foreground transition-colors"
        >
          Szilard Dobai
        </Link>
        <nav className="flex items-center gap-6">
          {isHome && (
            <>
              <a
                href="#projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
