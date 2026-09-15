'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Post {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

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

  const handleCreate = () => {
    setFormData({ title: '', content: '' })
    setEditingPost(null)
    setIsCreating(true)
  }

  const handleEdit = (post: Post) => {
    setFormData({ title: post.title, content: post.content })
    setEditingPost(post)
    setIsCreating(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content) return

    setSubmitting(true)
    try {
      if (editingPost) {
        // Update existing post
        const response = await fetch(`/api/posts/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) throw new Error('Failed to update post')
        const updated = await response.json()
        setPosts(posts.map(p => p.id === updated.id ? updated : p))
      } else {
        // Create new post
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, author: 'Ben Lee' }),
        })
        if (!response.ok) throw new Error('Failed to create post')
        const created = await response.json()
        setPosts([created, ...posts])
      }
      setIsCreating(false)
      setFormData({ title: '', content: '' })
      setEditingPost(null)
    } catch (error) {
      console.error('Error saving post:', error)
      alert('게시글 저장에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete post')
      setPosts(posts.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingPost(null)
    setFormData({ title: '', content: '' })
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>
  }

  if (isCreating) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              required
              disabled={submitting}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : editingPost ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Board Posts</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No posts yet. Create your first post!
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {post.author} · {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 line-clamp-2">{post.content}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
