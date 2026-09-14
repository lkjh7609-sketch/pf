'use client'

import { projectsData } from '@/data/projects'
import ImageGallery from './ImageGallery'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Projects() {
  const { messages } = useLanguage()

  return (
    <section id="projects" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2 text-black">{messages.projects.title}</h2>
          <p className="text-gray-500 font-light mb-16">{messages.projects.subtitle}</p>
        </AnimatedSection>

        {projectsData.length > 0 ? (
          <ImageGallery items={projectsData} />
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
