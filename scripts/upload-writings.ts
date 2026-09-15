import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const writingsData = [
  {
    title: '첫 번째 글 제목',
    description: '글에 대한 간단한 설명 (150자 이내)',
    content: `# 본문 제목

여기에 긴 본문을 작성하세요.
줄바꿈도 자유롭게 사용할 수 있습니다.

## 소제목

- 리스트도 가능
- 마크다운 문법 지원
- 1500자 이상도 문제없음

코드 블록도 가능:
\`\`\`javascript
const example = "Hello World";
console.log(example);
\`\`\`

**굵은 글씨**, *이탤릭*, [링크](https://example.com) 등
모든 마크다운 문법을 사용할 수 있습니다.

긴 문장도 템플릿 리터럴(\` \`)을 사용하면
자연스럽게 여러 줄로 작성할 수 있고,
들여쓰기도 유지됩니다.`,
    thumbnail: '/images/thumb1.jpg',
    images: ['/images/img1.jpg', '/images/img2.jpg'],
    link: 'https://example.com',
    category: 'Tech',
    tags: ['JavaScript', 'React', 'Next.js'],
  },
  {
    title: '두 번째 글',
    description: '또 다른 글 설명',
    content: `여기에 또 다른 긴 글을 작성하세요.

줄바꿈이 많아도 문제없습니다.


여러 줄 공백도 그대로 유지됩니다.

1500자, 3000자, 그 이상도 모두 가능합니다.`,
    thumbnail: '/images/thumb2.jpg',
    images: [],
    link: null,
    category: 'Daily',
    tags: ['생각', '일상'],
  },
  // 여기에 계속 추가...
]

async function uploadWritings() {
  console.log('글 업로드 시작...')

  for (const writing of writingsData) {
    const result = await prisma.writing.create({
      data: writing,
    })
    console.log('✓ 업로드:', result.title)
  }

  console.log(`완료! ${writingsData.length}개 업로드됨`)
}

uploadWritings()
  .catch((e) => {
    console.error('에러:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
