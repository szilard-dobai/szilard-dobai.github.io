import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/about";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.06) 40%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-3xl text-center flex flex-col items-center gap-6"
      >
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase">
          Full Stack Engineer
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
            Szilard
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I make things that work
          <span className="text-sm italic text-muted-foreground/60">
            {" "}
            *most of the time
          </span>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
            <a href="#projects">
              <ArrowDown className="mr-2 h-4 w-4" />
              View Projects
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-muted-foreground/40"
        />
      </motion.div>
    </section>
  );
}
