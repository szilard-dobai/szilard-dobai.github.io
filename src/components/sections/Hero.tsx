import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Szilard Dobai
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Senior Full Stack Engineer
        </p>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Building things for the web. Here are some of my recent side projects.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12"
      >
        <Button variant="ghost" size="icon" asChild>
          <a href="#projects">
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </Button>
      </motion.div>
    </section>
  )
}
