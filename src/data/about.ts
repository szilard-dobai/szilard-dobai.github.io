export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const skills: string[] = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "GraphQL",
  "tRPC",
  "PostgreSQL",
  "Prisma",
  "Terraform",
  "GCP",
  "Git",
];

export const experience: Experience[] = [
  {
    role: "Senior Full Stack Engineer",
    company: "Save My Exams",
    period: "Dec 2023 — Present",
    description:
      "Building and maintaining the platform that helps students ace their exams, with a focus on React and TypeScript.",
  },
  {
    role: "Full Stack Engineer",
    company: "Hier Foods",
    period: "Jun 2022 — Oct 2023",
    description:
      "Part of a 4-person engineering team building internal and customer-facing software. Migrated the database from Firebase to PostgreSQL, streamlined deployments with Terraform on GCP, and reduced a 3-4 hour weekly process to 5 minutes.",
  },
  {
    role: "Frontend Developer",
    company: "[e-spres-oh]",
    period: "Nov 2020 — Jun 2022",
    description:
      "Core frontend team member on a cloud-based IoT product that helped the client startup raise multi-million dollar funding. Wrote unit, integration, and E2E tests, and automated deployment pipelines.",
  },
  {
    role: "Software Engineer Intern",
    company: "Amorph Systems",
    period: "Mar 2019 — Sep 2019",
    description:
      "Researched and built machine learning models to estimate passenger flow in airports using Python, Keras, and Scikit-Learn.",
  },
];

export const aboutText =
  "Senior Full-Stack Engineer with a primary focus on front-end development. Committed to delivering excellence through meticulous attention to detail.";

export const socialLinks = {
  github: "https://github.com/szilard-dobai",
  linkedin: "https://linkedin.com/in/szilard-dobai",
};
