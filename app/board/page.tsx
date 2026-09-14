'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  author: string
  date: string
  content: string
  files?: { name: string; url: string }[]
}

// 임시 게시글 데이터
const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    title: '첫 번째 게시글입니다',
    author: 'Ben Lee',
    date: '2026-09-14',
    content: '게시판 테스트 글입니다.',
    files: [],
  },
]

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isWriting, setIsWriting] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '' })

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }

  const handleBack = () => {
    setSelectedPost(null)
    setIsWriting(false)
  }

  const handleNewPost = () => {
    if (!newPost.title || !newPost.content) return

    const post: Post = {
      id: posts.length + 1,
      title: newPost.title,
      author: 'Ben Lee',
      date: new Date().toISOString().split('T')[0],
      content: newPost.content,
      files: [],
    }

    setPosts([post, ...posts])
    setNewPost({ title: '', content: '' })
    setIsWriting(false)
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
        {!selectedPost && !isWriting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Board</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWriting(true)}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                글쓰기
              </motion.button>
            </div>

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
                    <span>{post.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <span>{selectedPost.date}</span>
              </div>
              <div className="prose max-w-none whitespace-pre-wrap">
                {selectedPost.content}
              </div>

              {selectedPost.files && selectedPost.files.length > 0 && (
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

        {/* Write Post */}
        {isWriting && (
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
              ← 취소
            </motion.button>

            <div className="bg-beige-light p-8 rounded-lg">
              <h1 className="text-3xl font-bold mb-6">새 글 작성</h1>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">제목</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-beige-dark"
                    placeholder="제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">내용</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-beige-dark resize-none"
                    placeholder="내용을 입력하세요"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewPost}
                    className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    작성완료
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
