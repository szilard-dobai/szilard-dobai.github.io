import { socialLinks } from "@/data/about"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto flex items-center justify-between px-6 text-xs text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Szilard Dobai</span>
        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
