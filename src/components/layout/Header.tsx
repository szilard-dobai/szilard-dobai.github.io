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
