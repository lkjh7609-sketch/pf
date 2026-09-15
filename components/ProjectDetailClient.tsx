'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

interface Project {
  id: string
  title: string
  description: string
  content: string | null
  thumbnail: string
  images: string[]
  link?: string | null
  createdAt: string
  updatedAt: string
}

interface ProjectDetailClientProps {
  project: Project
  recentProjects: Project[]
}

export default function ProjectDetailClient({ project, recentProjects }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-lg font-semibold cursor-pointer"
            >
              Ben Lee
            </motion.span>
          </Link>
          <Link href="/#projects">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium hover:text-beige-dark transition-colors cursor-pointer"
            >
              ← Back to Projects
            </motion.span>
          </Link>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white"
            >
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{new Date(project.createdAt).toLocaleDateString('ko-KR')}</span>
                  {project.link && (
                    <>
                      <span>·</span>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Project Link ↗
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="mb-8">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {/* Markdown Content */}
              <div className="prose prose-lg max-w-none">
                {project.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      code: ({ node, inline, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline ? (
                          <div className="relative">
                            {match && (
                              <div className="absolute top-2 right-2 text-xs text-gray-400 uppercase">
                                {match[1]}
                              </div>
                            )}
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {project.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-500">No content available.</p>
                )}
              </div>

              {/* Images Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold mb-6">Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`${project.title} - ${idx + 1}`}
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-beige-light p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {recentProjects.map((item) => (
                    <Link key={item.id} href={`/projects/${item.id}`}>
                      <div className="group cursor-pointer">
                        <div className="aspect-video rounded overflow-hidden mb-2">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-beige-dark transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
