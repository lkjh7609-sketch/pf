import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const guestbookData = [
  {
    name: '홍길동',
    message: '안녕하세요! 좋은 포트폴리오네요.',
    isPublic: true,
    approved: true,
  },
  {
    name: '김철수',
    message: '응원합니다!',
    isPublic: true,
    approved: true,
  },
  {
    name: '이영희',
    message: '멋진 프로젝트입니다.',
    isPublic: true,
    approved: false,
  },
  // 여기에 더 추가하세요
]

async function uploadGuestbook() {
  console.log('방명록 업로드 시작...')

  for (const entry of guestbookData) {
    const result = await prisma.guestbook.create({
      data: entry,
    })
    console.log('✓ 업로드:', result.name)
  }

  console.log(`완료! ${guestbookData.length}개 업로드됨`)
}

uploadGuestbook()
  .catch((e) => {
    console.error('에러:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
