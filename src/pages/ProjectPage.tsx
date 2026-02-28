import { useParams } from "react-router"

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  return <div className="container mx-auto px-4 py-16">Project: {slug}</div>
}
