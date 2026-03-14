import { Badge } from "@/components/ui/badge";
import { aboutText, experience, skills, socialLinks } from "@/data/about";
import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
            About
          </h2>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            A bit about me
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            {aboutText}
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="font-normal text-xs px-3 py-1"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">
            Experience
          </h3>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className="group relative pl-6 before:absolute before:left-0 before:top-[10px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-muted-foreground/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="font-medium text-sm">{exp.role}</h4>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {exp.company}
                </p>
                <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-4"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
