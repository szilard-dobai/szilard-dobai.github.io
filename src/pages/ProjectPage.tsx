import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { ImageGallery } from "@/components/project/ImageGallery";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="flex items-center gap-4 mb-3">
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="h-12 w-12 rounded-lg"
          />
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-10">
          {project.oneLiner}
        </p>

        <ImageGallery images={project.images} alt={project.name} />

        <p className="mt-10 text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="mt-10 flex gap-3">
          <Button className="shadow-lg shadow-primary/25" asChild>
            <a href={`${project.appUrl}?utm_source=portfolio&utm_medium=website&utm_campaign=${project.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live App
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
