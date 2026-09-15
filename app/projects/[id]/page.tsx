import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjectDetailClient from '@/components/ProjectDetailClient'

interface PageProps {
  params: { id: string }
}

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    notFound()
  }

  return project
}

async function getRecentProjects(currentId: string) {
  const projects = await prisma.project.findMany({
    where: {
      id: {
        not: currentId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })

  return projects
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.id)
  const recentProjects = await getRecentProjects(params.id)

  // Convert Date to string for client component
  const serializedProject = {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }

  const serializedRecentProjects = recentProjects.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  return <ProjectDetailClient project={serializedProject} recentProjects={serializedRecentProjects} />
}
