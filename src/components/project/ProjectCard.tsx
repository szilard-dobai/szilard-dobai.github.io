import { Link } from "react-router";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block cursor-pointer"
      >
        <div className="flex flex-col rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="aspect-16/10 overflow-hidden relative">
            <img
              src={project.images[0]}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-8 w-8 rounded-md"
              />
              <h3 className="text-lg font-bold">{project.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.oneLiner}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
