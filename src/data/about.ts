export type Experience = {
  role: string
  company: string
  period: string
  description: string
}

export const skills: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Git",
]

export const experience: Experience[] = [
  {
    role: "Fullstack Software Engineer",
    company: "Company Name",
    period: "2023 — Present",
    description: "Brief description of your role and key accomplishments.",
  },
  {
    role: "Software Engineer",
    company: "Previous Company",
    period: "2021 — 2023",
    description: "Brief description of your role and key accomplishments.",
  },
]

export const aboutText =
  "A fullstack software engineer who enjoys building useful things. Placeholder text — replace with your own bio."

export const socialLinks = {
  github: "https://github.com/szilard-dobai",
  linkedin: "https://linkedin.com/in/szilard-dobai",
  email: "mailto:your@email.com",
}
