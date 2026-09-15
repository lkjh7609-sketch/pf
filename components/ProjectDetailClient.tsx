'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'
import MusicPlayer from './MusicPlayer'

interface Project {
  id: string
  title: string
  description: string
  content: string | null
  thumbnail: string
  images: string[]
  link?: string | null
  bgmUrl?: string | null
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
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end items-center">
          <Link href="/#projects">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-sm hover:text-beige-dark transition-colors cursor-pointer"
            >
              ← Back to Projects
            </motion.span>
          </Link>
        </div>
      </motion.nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-4">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white"
            >
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-light text-black mb-3">{project.title}</h1>
                <p className="text-sm text-gray-500 font-light mb-4">{project.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 font-light">
                  <span>{new Date(project.createdAt).toLocaleDateString('ko-KR')}</span>
                  {project.link && (
                    <>
                      <span>·</span>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-beige-dark transition-colors"
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
              <div className="prose prose-sm max-w-none prose-headings:font-light prose-headings:text-black prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed">
                {project.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-4 whitespace-pre-line">{children}</p>
                      ),
                      br: () => <br />,
                      h1: ({ children }) => <h1 className="text-2xl font-light mb-4 mt-8">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-light mb-3 mt-6">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-light mb-2 mt-4">{children}</h3>,
                      ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                      code: ({ node, inline, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline ? (
                          <div className="relative my-4">
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
                          <code className={`${className} px-1 py-0.5 bg-gray-100 rounded text-sm`} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {project.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-sm text-gray-400 font-light">No content available.</p>
                )}
              </div>

              {/* Images Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-light text-black mb-4">Images</h3>
                  <div className="w-12 h-px bg-gray-300 mb-6"></div>
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
            <div className="sticky top-24 ml-auto max-w-[180px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-beige-light p-4 rounded-lg"
              >
                <h3 className="text-xs font-light text-gray-400 uppercase tracking-wider text-center mb-4">Recent</h3>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {recentProjects.map((item) => (
                    <Link key={item.id} href={`/projects/${item.id}`}>
                      <div className="group cursor-pointer text-center">
                        <div className="aspect-video rounded overflow-hidden mb-1.5">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-light text-xs line-clamp-2 group-hover:text-beige-dark transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-light mt-0.5">
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

      {/* Music Player */}
      {project.bgmUrl && <MusicPlayer bgmUrl={project.bgmUrl} title={project.title} />}
    </div>
  )
}
