'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageUpload from './ImageUpload'

interface Project {
  id: string
  title: string
  description: string
  content: string | null
  thumbnail: string
  images: string[]
  link?: string
  category?: string
  tags?: string[]
  createdAt: string
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    thumbnail: '',
    images: '',
    link: '',
    category: '',
    tags: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
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
      category: '',
      tags: '',
    })
    setEditingProject(null)
    setIsCreating(true)
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      content: project.content || '',
      thumbnail: project.thumbnail,
      images: project.images.join('\n'),
      link: project.link || '',
      category: project.category || '',
      tags: (project.tags || []).join(', '),
    })
    setEditingProject(project)
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
      category: formData.category || null,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }

    setSubmitting(true)
    try {
      if (editingProject) {
        const response = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to update project')
        const updated = await response.json()
        setProjects(projects.map(p => p.id === updated.id ? updated : p))
      } else {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to create project')
        const created = await response.json()
        setProjects([created, ...projects])
      }
      setIsCreating(false)
      setFormData({ title: '', description: '', content: '', thumbnail: '', images: '', link: '', category: '', tags: '' })
      setEditingProject(null)
    } catch (error) {
      console.error('Error saving project:', error)
      alert('프로젝트 저장에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete project')
      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('프로젝트 삭제에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingProject(null)
    setFormData({ title: '', description: '', content: '', thumbnail: '', images: '', link: '', category: '', tags: '' })
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>
  }

  if (isCreating) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">
          {editingProject ? 'Edit Project' : 'Create New Project'}
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
          <div>
            <label className="block text-sm font-medium mb-2">Category (optional)</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="Backend, Frontend, FullStack, etc."
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags (optional)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="ABAP, Java, React (comma separated)"
              disabled={submitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple tags with commas
            </p>
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
              {submitting ? 'Saving...' : editingProject ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No projects yet. Create your first project!
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300"
            >
              <div className="flex gap-4">
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{project.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>{project.images.length} images</span>
                    {project.link && <span>• Has link</span>}
                    <span>• {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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
