import { SocialLinks } from "@/components/shared/SocialLinks";

const CURRENT_YEAR = new Date().getFullYear();

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
  );
}
