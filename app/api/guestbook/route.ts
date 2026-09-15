import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET: 승인된 공개 방명록만 조회 (일반 사용자용)
export async function GET() {
  try {
    const entries = await prisma.guestbook.findMany({
      where: {
        approved: true,
        isPublic: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(entries, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    })
  } catch (error) {
    console.error('Failed to fetch guestbook entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}

// POST: 새 방명록 작성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message, isPublic } = body

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    const entry = await prisma.guestbook.create({
      data: {
        name,
        message,
        isPublic: isPublic ?? true,
        approved: false, // 관리자 승인 필요
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Failed to create guestbook entry:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
