export type Project = {
  slug: string;
  name: string;
  logo: string;
  oneLiner: string;
  description: string;
  images: string[];
  appUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    slug: "framed",
    name: "Framed",
    logo: "/projects/framed/logo.svg",
    oneLiner: "Device mockup generator",
    description:
      "Create beautiful device mockups in seconds. Upload a screenshot, pick a device frame, and download a high-res image — free, instant, no signup.",
    images: ["/projects/framed/screenshot.png"],
    appUrl: "https://framed-gray.vercel.app/",
    githubUrl: "https://github.com/szilard-dobai/framed",
  },
  {
    slug: "my-kitchen-buddy",
    name: "My Kitchen Buddy",
    logo: "/projects/my-kitchen-buddy/logo.svg",
    oneLiner: "Extract recipes from cooking videos with AI",
    description:
      "Paste a TikTok, Instagram Reel, or YouTube video URL and get a structured recipe extracted via AI. Organize recipes into collections, add custom tags, discover similar recipes, and track nutrition info.",
    images: ["/projects/my-kitchen-buddy/screenshot.png"],
    appUrl: "https://my-kitchen-buddy-three.vercel.app/",
    githubUrl: "https://github.com/szilard-dobai/my-kitchen-buddy",
  },
  {
    slug: "watched",
    name: "Watched",
    logo: "/projects/watched/logo.svg",
    oneLiner: "Track what you watch, share lists with friends",
    description:
      "A movie and TV show tracking app. Create shared lists with invite links and role-based permissions, search TMDB for metadata, rate entries, track watch history across platforms, and import/export via CSV.",
    images: ["/projects/watched/screenshot.png"],
    appUrl: "https://watched.work/",
    githubUrl: "https://github.com/szilard-dobai/watched",
  },
  {
    slug: "yearly",
    name: "Yearly",
    logo: "/projects/yearly/logo.svg",
    oneLiner: "Your year, at a glance",
    description:
      "A tool that automatically turns your travel history into a clean, share-ready calendar. No design tools, no manual emojis, no fiddly alignment — just add your trips, generate your calendar, and share it with the world.",
    images: ["/projects/yearly/screenshot.png"],
    appUrl: "https://yearly.world/",
    githubUrl: "https://github.com/szilard-dobai/yearly",
  },
  {
    slug: "audiocalendar",
    name: "AudioCalendar",
    logo: "/projects/audiocalendar/logo.svg",
    oneLiner: "Never miss a beat",
    description:
      "Connects your Google Calendar with Spotify to automatically track what music you listen to and when.",
    images: ["/projects/audiocalendar/screenshot.png"],
    appUrl: "https://audiocalendar.vercel.app/",
    githubUrl: "https://github.com/szilard-dobai/audiocalendar",
  },
];
