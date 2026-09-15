import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 모든 프로젝트 조회
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST: 새 프로젝트 생성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, content, thumbnail, images, link, category, tags } = body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        content,
        thumbnail,
        images: images || [],
        link,
        category,
        tags: tags || [],
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
