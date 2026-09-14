import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 모든 게시글 조회
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST: 새 게시글 생성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, author, content, files } = body

    const post = await prisma.post.create({
      data: {
        title,
        author,
        content,
        files: files || null,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
