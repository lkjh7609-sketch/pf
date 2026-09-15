import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projectsData = [
  {
    title: '프로젝트 제목',
    description: '프로젝트에 대한 간단한 설명',
    content: `# 프로젝트 상세 설명

여기에 긴 프로젝트 설명을 작성하세요.

## 주요 기능
- 기능 1
- 기능 2
- 기능 3

## 기술 스택
- React
- Node.js
- PostgreSQL

## 개발 과정
긴 개발 과정 설명...
여러 줄로 작성 가능...`,
    thumbnail: '/images/project1.jpg',
    images: ['/images/p1-1.jpg', '/images/p1-2.jpg'],
    link: 'https://github.com/username/project',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },
  // 여기에 계속 추가...
]

async function uploadProjects() {
  console.log('프로젝트 업로드 시작...')

  for (const project of projectsData) {
    const result = await prisma.project.create({
      data: project,
    })
    console.log('✓ 업로드:', result.title)
  }

  console.log(`완료! ${projectsData.length}개 업로드됨`)
}

uploadProjects()
  .catch((e) => {
    console.error('에러:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
