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
