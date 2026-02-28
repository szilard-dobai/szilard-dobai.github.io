export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex items-center justify-center px-4 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Szilard Dobai
      </div>
    </footer>
  )
}
