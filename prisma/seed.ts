import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { projectsData } from '../data/projects'
import { writingsData } from '../data/writings'

// Load environment variables
config()

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting data migration...')

  // Migrate projects
  console.log('📦 Migrating projects...')
  let projectCount = 0
  for (const project of projectsData) {
    try {
      await prisma.project.upsert({
        where: { id: project.id },
        update: {
          title: project.title,
          description: project.description,
          thumbnail: project.thumbnail,
          images: project.images || [],
          link: project.link,
        },
        create: {
          id: project.id,
          title: project.title,
          description: project.description,
          thumbnail: project.thumbnail,
          images: project.images || [],
          link: project.link,
        },
      })
      projectCount++
    } catch (error) {
      console.warn(`⚠️ Skipped project ${project.id}`)
    }
  }
  console.log(`✅ Migrated ${projectCount} projects`)

  // Migrate writings
  console.log('📝 Migrating writings...')
  let writingCount = 0
  for (const writing of writingsData) {
    try {
      await prisma.writing.upsert({
        where: { id: writing.id },
        update: {
          title: writing.title,
          description: writing.description,
          thumbnail: writing.thumbnail,
          images: writing.images || [],
          link: writing.link,
        },
        create: {
          id: writing.id,
          title: writing.title,
          description: writing.description,
          thumbnail: writing.thumbnail,
          images: writing.images || [],
          link: writing.link,
        },
      })
      writingCount++
    } catch (error) {
      console.warn(`⚠️ Skipped writing ${writing.id}`)
    }
  }
  console.log(`✅ Migrated ${writingCount} writings`)

  // Add sample board post
  console.log('💬 Creating sample board post...')
  try {
    await prisma.post.upsert({
      where: { id: 'sample-post-1' },
      update: {
        title: '첫 번째 게시글입니다',
        author: 'Ben Lee',
        content: '게시판 테스트 글입니다.',
      },
      create: {
        id: 'sample-post-1',
        title: '첫 번째 게시글입니다',
        author: 'Ben Lee',
        content: '게시판 테스트 글입니다.',
      },
    })
    console.log('✅ Created sample post')
  } catch (error) {
    console.warn('⚠️ Sample post already exists')
  }

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
