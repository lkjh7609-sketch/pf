'use client'

import { useState, useEffect } from 'react'
import ImageGallery from './ImageGallery'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  images: string[]
  link?: string
}

export default function Projects() {
  const { messages } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-light mb-2 text-black">{messages.projects.title}</h2>
            <p className="text-gray-500 font-light mb-16">{messages.projects.subtitle}</p>
          </AnimatedSection>
          <div className="text-center py-20 text-gray-400 font-light">
            <p className="text-4xl mb-4">⏳</p>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-light mb-2 text-black">{messages.projects.title}</h2>
            <p className="text-gray-500 font-light mb-16">{messages.projects.subtitle}</p>
          </AnimatedSection>
          <div className="text-center py-20 text-red-400 font-light">
            <p className="text-4xl mb-4">⚠️</p>
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2 text-black">{messages.projects.title}</h2>
          <p className="text-gray-500 font-light mb-16">{messages.projects.subtitle}</p>
        </AnimatedSection>

        {projects.length > 0 ? (
          <ImageGallery items={projects} type="projects" />
        ) : (
          <div className="text-center py-20 text-gray-400 font-light">
            <p className="text-4xl mb-4">🚀</p>
            <p>{messages.projects.empty}</p>
          </div>
        )}
      </div>
    </section>
  )
}
