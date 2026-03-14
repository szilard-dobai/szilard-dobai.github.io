import { motion } from "motion/react"

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6">
      {/* Subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-foreground/[0.03] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative text-center"
      >
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
          Full Stack Engineer
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          Hi, I'm Szilard
        </h1>
        <p className="mt-6 max-w-md mx-auto text-base text-muted-foreground leading-relaxed">
          I build things for the web. Here are some of my recent side projects.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-12"
      >
        <a href="#projects" className="group flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground tracking-wider uppercase group-hover:text-foreground transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-muted-foreground/40"
          />
        </a>
      </motion.div>
    </section>
  )
}
