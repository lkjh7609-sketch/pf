import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: 특정 방명록 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const entry = await prisma.guestbook.findUnique({
      where: { id: params.id },
    })

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Failed to fetch entry:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entry' },
      { status: 500 }
    )
  }
}

// PUT: 방명록 승인/거부 (관리자용)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { approved } = body

    const entry = await prisma.guestbook.update({
      where: { id: params.id },
      data: { approved },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Failed to update entry:', error)
    return NextResponse.json(
      { error: 'Failed to update entry' },
      { status: 500 }
    )
  }
}

// DELETE: 방명록 삭제 (관리자용)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.guestbook.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete entry:', error)
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    )
  }
}
