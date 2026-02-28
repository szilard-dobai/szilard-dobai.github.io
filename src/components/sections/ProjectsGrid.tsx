import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/project/ProjectCard"

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-12">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
