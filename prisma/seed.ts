import { PrismaClient } from '@prisma/client'
import { projectsData } from '../data/projects'
import { writingsData } from '../data/writings'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting data migration...')

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.post.deleteMany()
  await prisma.writing.deleteMany()
  await prisma.project.deleteMany()

  // Migrate projects
  console.log('📦 Migrating projects...')
  for (const project of projectsData) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        thumbnail: project.thumbnail,
        images: project.images || [],
        link: project.link,
      },
    })
  }
  console.log(`✅ Migrated ${projectsData.length} projects`)

  // Migrate writings
  console.log('📝 Migrating writings...')
  for (const writing of writingsData) {
    await prisma.writing.create({
      data: {
        title: writing.title,
        description: writing.description,
        thumbnail: writing.thumbnail,
        images: writing.images || [],
        link: writing.link,
      },
    })
  }
  console.log(`✅ Migrated ${writingsData.length} writings`)

  // Add sample board post
  console.log('💬 Creating sample board post...')
  await prisma.post.create({
    data: {
      title: '첫 번째 게시글입니다',
      author: 'Ben Lee',
      content: '게시판 테스트 글입니다.',
    },
  })
  console.log('✅ Created sample post')

  console.log('🎉 Migration completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
