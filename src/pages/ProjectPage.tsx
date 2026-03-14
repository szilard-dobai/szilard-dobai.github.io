import { useParams, Link, Navigate } from "react-router"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projects } from "@/data/projects"
import { ImageGallery } from "@/components/project/ImageGallery"

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="container mx-auto max-w-3xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="flex items-center gap-4 mb-3">
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="h-10 w-10 rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {project.name}
            </h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-10">
          {project.oneLiner}
        </p>

        <ImageGallery images={project.images} alt={project.name} />

        <p className="mt-10 text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="mt-10 flex gap-3">
          <Button size="sm" asChild>
            <a href={project.appUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              Live App
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-3.5 w-3.5" />
              Source Code
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
