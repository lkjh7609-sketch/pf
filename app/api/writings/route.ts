import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 모든 글 조회
export async function GET() {
  try {
    const writings = await prisma.writing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(writings)
  } catch (error) {
    console.error('Failed to fetch writings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch writings' },
      { status: 500 }
    )
  }
}

// POST: 새 글 생성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received body:', body)
    const { title, description, content, thumbnail, images, link, category, tags, bgmUrl } = body

    const writing = await prisma.writing.create({
      data: {
        title,
        description,
        content,
        thumbnail,
        images: images || [],
        link: link || null,
        category: category || null,
        tags: tags || [],
        bgmUrl: bgmUrl || null,
      },
    })

    return NextResponse.json(writing, { status: 201 })
  } catch (error) {
    console.error('Failed to create writing:', error)
    return NextResponse.json(
      { error: 'Failed to create writing', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
