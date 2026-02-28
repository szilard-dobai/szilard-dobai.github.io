export type Project = {
  slug: string
  name: string
  logo: string
  oneLiner: string
  description: string
  images: string[]
  appUrl: string
  githubUrl: string
}

export const projects: Project[] = [
  {
    slug: "yearly",
    name: "Yearly",
    logo: "/projects/yearly/logo.svg",
    oneLiner: "Your year, at a glance",
    description:
      "A tool that automatically turns your travel history into a clean, share-ready calendar. No design tools, no manual emojis, no fiddly alignment — just add your trips, generate your calendar, and share it with the world.",
    images: [
      "/projects/yearly/screenshot-1.svg",
    ],
    appUrl: "https://yearly.world",
    githubUrl: "https://github.com/szilard-dobai/yearly",
  },
  {
    slug: "audiocalendar",
    name: "AudioCalendar",
    logo: "/projects/audiocalendar/logo.svg",
    oneLiner: "Never miss a beat",
    description:
      "Connects your Google Calendar with Spotify to automatically track what music you listen to and when. Built with Next.js, Supabase, and the Spotify API in a Turborepo monorepo.",
    images: [
      "/projects/audiocalendar/screenshot-1.svg",
    ],
    appUrl: "https://audiocalendar.app",
    githubUrl: "https://github.com/szilard-dobai/audiocalendar",
  },
]
