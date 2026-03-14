import { Badge } from "@/components/ui/badge";
import { aboutText, experience, skills } from "@/data/about";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {aboutText}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Core Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <SocialLinks variant="text" className="flex items-center gap-4 mt-2" />
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Experience
            </h2>
            <div className="relative border-l-2 border-border ml-3 space-y-10 pl-8">
              {experience.map((exp, index) => (
                <div key={`${exp.company}-${exp.period}`} className="relative">
                  <div
                    className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background ${
                      index === 0 ? "bg-primary" : "bg-border"
                    }`}
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-sm font-medium ${
                        index === 0 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {exp.period}
                    </span>
                    <h4 className="text-lg font-bold">{exp.role}</h4>
                    <span className="text-muted-foreground">{exp.company}</span>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
