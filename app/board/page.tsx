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
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end items-center">
          <div className="flex gap-8 items-center">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium hover:text-beige-dark transition-colors cursor-pointer"
              >
                Home
              </motion.span>
            </Link>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium cursor-pointer"
            >
              Board
            </motion.span>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Post List */}
        {!selectedPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold">Board</h1>
              <p className="text-sm text-gray-500 mt-2">공지사항 및 소식을 확인하세요</p>
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-4">⏳</p>
                <p>Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-4">📝</p>
                <p>아직 게시글이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePostClick(post)}
                    className="p-6 border border-gray-200 rounded-lg hover:border-beige-dark transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{formatDate(post.createdAt)}</span>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="mb-6 text-gray-600 hover:text-black transition-colors"
            >
              ← 목록으로
            </motion.button>

            <div className="bg-beige-light p-8 rounded-lg">
              <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
              <div className="flex gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-300">
                <span>{selectedPost.author}</span>
                <span>·</span>
                <span>{formatDate(selectedPost.createdAt)}</span>
              </div>
              <div className="prose max-w-none whitespace-pre-wrap">
                {selectedPost.content}
              </div>

              {selectedPost.files && Array.isArray(selectedPost.files) && selectedPost.files.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-300">
                  <h3 className="font-semibold mb-3">첨부파일</h3>
                  <div className="space-y-2">
                    {selectedPost.files.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        className="block text-blue-600 hover:underline"
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
