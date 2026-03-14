import { socialLinks } from "@/data/about"

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground font-medium">
          &copy; {new Date().getFullYear()} Szilard Dobai
        </p>
        <div className="flex items-center gap-4">
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
      </div>
    </footer>
  )
}
