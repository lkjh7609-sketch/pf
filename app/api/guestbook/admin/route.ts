import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 모든 방명록 조회 (관리자용)
export async function GET() {
  try {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Failed to fetch all guestbook entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}
