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
    slug: "project-one",
    name: "Project One",
    logo: "/projects/project-one/logo.svg",
    oneLiner: "A short description of what this project does",
    description:
      "A longer description that explains the project in more detail. This can span multiple sentences and describe the tech stack, motivation, and key features.",
    images: [
      "/projects/project-one/screenshot-1.svg",
      "/projects/project-one/screenshot-2.svg",
    ],
    appUrl: "https://example.com",
    githubUrl: "https://github.com/example/project-one",
  },
  {
    slug: "project-two",
    name: "Project Two",
    logo: "/projects/project-two/logo.svg",
    oneLiner: "Another project with a catchy one-liner",
    description:
      "Another detailed description. The user will replace these placeholder entries with real project data, including actual screenshots and descriptions.",
    images: ["/projects/project-two/screenshot-1.svg"],
    appUrl: "https://example.com",
    githubUrl: "https://github.com/example/project-two",
  },
]
