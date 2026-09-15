import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import WritingDetailClient from '@/components/WritingDetailClient'

interface PageProps {
  params: { id: string }
}

async function getWriting(id: string) {
  const writing = await prisma.writing.findUnique({
    where: { id },
  })

  if (!writing) {
    notFound()
  }

  return writing
}

async function getRecentWritings(currentId: string) {
  const writings = await prisma.writing.findMany({
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

  return writings
}

export default async function WritingDetailPage({ params }: PageProps) {
  const writing = await getWriting(params.id)
  const recentWritings = await getRecentWritings(params.id)

  // Convert Date to string for client component
  const serializedWriting = {
    ...writing,
    createdAt: writing.createdAt.toISOString(),
    updatedAt: writing.updatedAt.toISOString(),
  }

  const serializedRecentWritings = recentWritings.map(w => ({
    ...w,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }))

  return <WritingDetailClient writing={serializedWriting} recentWritings={serializedRecentWritings} />
}
