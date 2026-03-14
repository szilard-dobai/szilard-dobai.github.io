import { Link } from "react-router"
import { motion } from "motion/react"
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 group-hover:border-foreground/15 group-hover:shadow-lg group-hover:shadow-foreground/[0.03]">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-7 w-7 rounded-md"
              />
              <h3 className="font-semibold text-sm">{project.name}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {project.oneLiner}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
