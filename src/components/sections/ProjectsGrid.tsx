import { motion } from "motion/react"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/project/ProjectCard"

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Projects
          </h2>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Things I've built recently
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
