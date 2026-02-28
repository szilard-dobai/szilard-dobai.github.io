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
