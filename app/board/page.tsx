'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  author: string
  content: string
  files?: { name: string; url: string }[] | null
  createdAt: string
}

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleBack = () => {
    setSelectedPost(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-4 flex justify-between items-center">
          <Link href="/" className="text-base md:text-sm font-semibold text-black hover:text-beige-dark transition-colors">
            ← Home
          </Link>
          <span className="text-base md:text-sm text-beige-dark">
            Board
          </span>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6 md:px-6 pt-24 pb-12">
        {/* Post List */}
        {!selectedPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-2xl lg:text-3xl font-light text-black">Board</h1>
              <div className="w-12 h-px bg-gray-300 mt-2 md:mt-3 mb-2"></div>
              <p className="text-sm md:text-sm text-gray-500 font-light">공지사항 및 소식을 확인하세요</p>
            </div>

            {loading ? (
              <div className="text-center py-12 md:py-16 text-gray-400">
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm md:text-sm font-light">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 md:py-16 text-gray-400">
                <p className="text-2xl md:text-3xl mb-3">📝</p>
                <p className="text-sm md:text-sm font-light">아직 게시글이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-3">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePostClick(post)}
                    className="p-5 md:p-5 border border-gray-200 rounded-lg hover:border-beige-dark hover:bg-beige-light/30 transition-all duration-300 cursor-pointer active:scale-[0.98] min-h-[72px]"
                  >
                    <h3 className="text-base md:text-base font-medium mb-2 line-clamp-2 break-keep">{post.title}</h3>
                    <div className="flex gap-3 md:gap-3 text-sm md:text-xs text-gray-500 font-light">
                      <span className="truncate max-w-[120px] md:max-w-none">{post.author}</span>
                      <span>·</span>
                      <span className="whitespace-nowrap">{formatDate(post.createdAt)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Post Detail */}
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button
              onClick={handleBack}
              className="mb-4 md:mb-6 text-base md:text-sm text-gray-500 font-light hover:text-black transition-colors min-h-[44px] flex items-center"
            >
              ← 목록으로
            </button>

            <div className="bg-beige-light p-6 md:p-6 lg:p-8 rounded-lg">
              <h1 className="text-xl md:text-xl lg:text-2xl font-light text-black mb-4 md:mb-4 break-words break-keep">
                {selectedPost.title}
              </h1>
              <div className="flex gap-3 md:gap-3 text-sm md:text-xs text-gray-500 font-light mb-6 md:mb-6 pb-6 md:pb-6 border-b border-beige-dark/30">
                <span className="truncate max-w-[120px] md:max-w-none">{selectedPost.author}</span>
                <span>·</span>
                <span className="whitespace-nowrap">{formatDate(selectedPost.createdAt)}</span>
              </div>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap font-light text-gray-700 text-base md:text-base break-words break-keep">
                {selectedPost.content}
              </div>

              {selectedPost.files && Array.isArray(selectedPost.files) && selectedPost.files.length > 0 && (
                <div className="mt-6 md:mt-8 pt-6 md:pt-6 border-t border-beige-dark/30">
                  <h3 className="text-sm md:text-sm font-medium mb-3 md:mb-3">첨부파일</h3>
                  <div className="space-y-2 md:space-y-2">
                    {selectedPost.files.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm md:text-sm font-light text-gray-600 hover:text-black transition-colors truncate min-h-[44px] flex items-center"
                      >
                        📎 {file.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
