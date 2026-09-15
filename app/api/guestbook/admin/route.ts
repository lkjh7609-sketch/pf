import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET: 모든 방명록 조회 (관리자용)
export async function GET() {
  try {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log('Fetched guestbook entries:', entries.length)

    // 캐시 방지
    return NextResponse.json(entries, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Failed to fetch all guestbook entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}
