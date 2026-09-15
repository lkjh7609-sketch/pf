'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from './AnimatedSection'
import ImageGallery from './ImageGallery'
import { useLanguage } from '@/contexts/LanguageContext'

interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  images: string[]
  link?: string
  category?: string
  tags?: string[]
  createdAt: string
}

export default function Projects() {
  const { messages } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTag, setSelectedTag] = useState<string>('All')

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

  // Extract unique categories and tags
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter((c): c is string => Boolean(c))))]
  const tags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))]

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory
    const tagMatch = selectedTag === 'All' || (project.tags && project.tags.includes(selectedTag))
    return categoryMatch && tagMatch
  })

  return (
    <section id="projects" className="min-h-screen py-20 md:py-24 px-6 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-light mb-3 text-black">
            {messages.projects.title}
          </h2>
          <p className="text-base md:text-base text-gray-500 font-light mb-8 md:mb-8">
            {messages.projects.subtitle}
          </p>

          {/* Filters */}
          {(categories.length > 1 || tags.length > 1) && (
            <div className="mb-8 md:mb-8 space-y-5">
              {/* Category Filter */}
              {categories.length > 1 && (
                <div>
                  <p className="text-sm md:text-sm font-medium mb-3">Category</p>
                  <div className="flex flex-wrap gap-2.5">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2.5 md:px-4 md:py-2 text-sm md:text-sm rounded-full transition-colors ${
                          selectedCategory === category
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Filter */}
              {tags.length > 1 && (
                <div>
                  <p className="text-sm md:text-sm font-medium mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2.5">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 md:px-3 md:py-1 text-sm md:text-xs rounded-full transition-colors ${
                          selectedTag === tag
                            ? 'bg-beige-dark text-white'
                            : 'bg-beige-light text-gray-700 hover:bg-beige-dark/20'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </AnimatedSection>

        {loading ? (
          <div className="text-center py-12 md:py-20 text-gray-400">
            <p className="text-3xl md:text-4xl mb-4">⏳</p>
            <p className="text-sm md:text-base">Loading projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <ImageGallery items={filteredProjects} type="projects" />
        ) : (
          <div className="text-center py-12 md:py-20 text-gray-400">
            <p className="text-3xl md:text-4xl mb-4">📁</p>
            <p className="text-sm md:text-base">{messages.projects.empty}</p>
          </div>
        )}
      </div>
    </section>
  )
}
