import { useEffect } from "react"
import { Hero } from "@/components/sections/Hero"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"
import { About } from "@/components/sections/About"

export default function Home() {
  useEffect(() => {
    const saved = sessionStorage.getItem("homeScrollY")
    if (saved) {
      document.documentElement.style.scrollBehavior = "auto"
      window.scrollTo(0, parseInt(saved, 10))
      sessionStorage.removeItem("homeScrollY")
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = ""
      })
    }

    const handleScroll = () => {
      sessionStorage.setItem("homeScrollY", String(window.scrollY))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Hero />
      <ProjectsGrid />
      <About />
    </>
  )
}
