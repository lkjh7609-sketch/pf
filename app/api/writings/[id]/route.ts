import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const writing = await prisma.writing.findUnique({
      where: { id: params.id },
    })

    if (!writing) {
      return NextResponse.json(
        { error: 'Writing not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(writing)
  } catch (error) {
    console.error('Failed to fetch writing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch writing' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, thumbnail, images, link } = body

    const writing = await prisma.writing.update({
      where: { id: params.id },
      data: {
        title,
        description,
        thumbnail,
        images: images || [],
        link,
      },
    })

    return NextResponse.json(writing)
  } catch (error) {
    console.error('Failed to update writing:', error)
    return NextResponse.json(
      { error: 'Failed to update writing' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.writing.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete writing:', error)
    return NextResponse.json(
      { error: 'Failed to delete writing' },
      { status: 500 }
    )
  }
}
