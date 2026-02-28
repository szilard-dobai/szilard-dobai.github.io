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
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="h-12 w-12 rounded-lg"
          />
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          {project.oneLiner}
        </p>

        <ImageGallery images={project.images} alt={project.name} />

        <p className="mt-8 text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="mt-8 flex gap-3">
          <Button asChild>
            <a href={project.appUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live App
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
