import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { skills, experience, aboutText, socialLinks } from "@/data/about"

export function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">About</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {aboutText}
          </p>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={`${exp.company}-${exp.period}`}>
                <div className="flex items-baseline justify-between">
                  <h4 className="font-medium">{exp.role}</h4>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2"
        >
          <Button variant="ghost" size="icon" asChild>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={socialLinks.email}>
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
