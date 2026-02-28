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
    images: ["/projects/yearly/screenshot-1.svg"],
    appUrl: "https://yearly.world",
    githubUrl: "https://github.com/szilard-dobai/yearly",
  },
  {
    slug: "watched",
    name: "Watched",
    logo: "/projects/watched/logo.svg",
    oneLiner: "Track what you watch, share lists with friends",
    description:
      "A movie and TV show tracking app. Create shared lists with invite links and role-based permissions, search TMDB for metadata, rate entries, track watch history across platforms, and import/export via CSV. Built with Next.js, MongoDB, Better Auth, and TanStack Query.",
    images: ["/projects/watched/screenshot-1.svg"],
    appUrl: "https://watched-three.vercel.app",
    githubUrl: "https://github.com/szilard-dobai/watched",
  },
  {
    slug: "my-kitchen-buddy",
    name: "My Kitchen Buddy",
    logo: "/projects/my-kitchen-buddy/logo.svg",
    oneLiner: "Extract recipes from cooking videos with AI",
    description:
      "Paste a TikTok, Instagram Reel, or YouTube video URL and get a structured recipe extracted via AI. Organize recipes into collections, add custom tags, discover similar recipes, and track nutrition info. Includes a Telegram bot and Pro subscription via Stripe. Built with Next.js, MongoDB, and OpenAI GPT-4o.",
    images: ["/projects/my-kitchen-buddy/screenshot-1.svg"],
    appUrl: "https://my-kitchen-buddy-three.vercel.app",
    githubUrl: "https://github.com/szilard-dobai/my-kitchen-buddy",
  },
  {
    slug: "audiocalendar",
    name: "AudioCalendar",
    logo: "/projects/audiocalendar/logo.svg",
    oneLiner: "Never miss a beat",
    description:
      "Connects your Google Calendar with Spotify to automatically track what music you listen to and when. Built with Next.js, Supabase, and the Spotify API in a Turborepo monorepo.",
    images: ["/projects/audiocalendar/screenshot-1.svg"],
    appUrl: "https://audiocalendar.app",
    githubUrl: "https://github.com/szilard-dobai/audiocalendar",
  },
]
