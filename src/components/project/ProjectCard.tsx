import { Link } from "react-router"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.slug}`}>
        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-foreground/20">
          <div className="aspect-video overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-8 w-8 rounded-md"
              />
              <h3 className="font-semibold">{project.name}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.oneLiner}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
