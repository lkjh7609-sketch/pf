export interface WritingItem {
  id: string
  title: string
  description: string
  thumbnail: string
  images?: string[]
  link?: string
}

export const writingsData: WritingItem[] = [
  {
    id: 'writing-1',
    title: '글 제목 1',
    description: '첫 번째 글 설명',
    thumbnail: '/images/writings/writing-1-thumb.jpg',
    images: [
      '/images/writings/writing-1-1.jpg',
    ],
    link: 'https://example.com',
  },
  // 여기에 더 많은 글을 추가하세요
]
