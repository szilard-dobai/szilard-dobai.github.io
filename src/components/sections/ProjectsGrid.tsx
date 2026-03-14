import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";

export function ProjectsGrid() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">Latest projects</h2>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
