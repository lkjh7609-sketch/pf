'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageUpload from './ImageUpload'

interface Writing {
  id: string
  title: string
  description: string
  content: string | null
  thumbnail: string
  images: string[]
  link?: string
  createdAt: string
}

export default function WritingsManager() {
  const [writings, setWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingWriting, setEditingWriting] = useState<Writing | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    images: '',
    link: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchWritings()
  }, [])

  async function fetchWritings() {
    try {
      const response = await fetch('/api/writings')
      if (!response.ok) throw new Error('Failed to fetch writings')
      const data = await response.json()
      setWritings(data)
    } catch (error) {
      console.error('Error fetching writings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      thumbnail: '',
      images: '',
      link: '',
    })
    setEditingWriting(null)
    setIsCreating(true)
  }

  const handleEdit = (writing: Writing) => {
    setFormData({
      title: writing.title,
      description: writing.description,
      content: writing.content || '',
      thumbnail: writing.thumbnail,
      images: writing.images.join('\n'),
      link: writing.link || '',
    })
    setEditingWriting(writing)
    setIsCreating(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.thumbnail) return

    const payload = {
      title: formData.title,
      description: formData.description,
      content: formData.content || null,
      thumbnail: formData.thumbnail,
      images: formData.images.split('\n').filter(img => img.trim()),
      link: formData.link || undefined,
    }

    setSubmitting(true)
    try {
      if (editingWriting) {
        const response = await fetch(`/api/writings/${editingWriting.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to update writing')
        const updated = await response.json()
        setWritings(writings.map(w => w.id === updated.id ? updated : w))
      } else {
        const response = await fetch('/api/writings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to create writing')
        const created = await response.json()
        setWritings([created, ...writings])
      }
      setIsCreating(false)
      setFormData({ title: '', description: '', content: '', thumbnail: '', images: '', link: '' })
      setEditingWriting(null)
    } catch (error) {
      console.error('Error saving writing:', error)
      alert('글 저장에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/writings/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete writing')
      setWritings(writings.filter(w => w.id !== id))
    } catch (error) {
      console.error('Error deleting writing:', error)
      alert('글 삭제에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingWriting(null)
    setFormData({ title: '', description: '', content: '', thumbnail: '', images: '', link: '' })
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>
  }

  if (isCreating) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">
          {editingWriting ? 'Edit Writing' : 'Create New Writing'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
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
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black font-mono text-sm"
              placeholder="Write markdown content here...&#10;&#10;# Heading&#10;## Subheading&#10;&#10;```javascript&#10;const code = 'example';&#10;```"
              disabled={submitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Supports markdown with code highlighting (ABAP, SQL, TypeScript, Java, etc.)
            </p>
          </div>
          <div>
            <ImageUpload
              label="Thumbnail *"
              onUpload={(url) => setFormData({ ...formData, thumbnail: url })}
              buttonText="Upload Thumbnail"
            />
            <input
              type="text"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black mt-2"
              placeholder="Or enter URL manually"
              disabled={submitting}
            />
          </div>
          <div>
            <ImageUpload
              label="Additional Images"
              onUpload={(url) => setFormData({
                ...formData,
                images: formData.images ? `${formData.images}\n${url}` : url
              })}
              buttonText="Upload Image"
            />
            <textarea
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black mt-2"
              placeholder="Or enter URLs manually (one per line)"
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Link (optional)</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="https://example.com"
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
              {submitting ? 'Saving...' : editingWriting ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Writings</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create New Writing
        </button>
      </div>

      {writings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No writings yet. Create your first writing!
        </div>
      ) : (
        <div className="space-y-4">
          {writings.map((writing) => (
            <motion.div
              key={writing.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300"
            >
              <div className="flex gap-4">
                {writing.thumbnail && (
                  <img
                    src={writing.thumbnail}
                    alt={writing.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{writing.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{writing.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>{writing.images.length} images</span>
                    {writing.link && <span>• Has link</span>}
                    <span>• {new Date(writing.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(writing)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(writing.id)}
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
