export interface ProjectItem {
  id: string
  title: string
  description: string
  thumbnail: string
  images?: string[]
  link?: string
}

export const projectsData: ProjectItem[] = [
  {
    id: 'project-1',
    title: '프로젝트 1',
    description: '첫 번째 프로젝트 설명',
    thumbnail: '/images/projects/project-1-thumb.jpg',
    images: [
      '/images/projects/project-1-1.jpg',
      '/images/projects/project-1-2.jpg',
    ],
    link: 'https://example.com',
  },
  // 여기에 더 많은 프로젝트를 추가하세요
]
