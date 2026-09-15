'use client'

import { useState, useEffect } from 'react'
import AnimatedSection from './AnimatedSection'
import ImageGallery from './ImageGallery'
import { useLanguage } from '@/contexts/LanguageContext'

interface Writing {
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

export default function Writings() {
  const { messages } = useLanguage()
  const [writings, setWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTag, setSelectedTag] = useState<string>('All')

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

  // Extract unique categories and tags
  const categories = ['All', ...Array.from(new Set(writings.map(w => w.category).filter((c): c is string => Boolean(c))))]
  const tags = ['All', ...Array.from(new Set(writings.flatMap(w => w.tags || [])))]

  // Filter writings
  const filteredWritings = writings.filter(writing => {
    const categoryMatch = selectedCategory === 'All' || writing.category === selectedCategory
    const tagMatch = selectedTag === 'All' || (writing.tags && writing.tags.includes(selectedTag))
    return categoryMatch && tagMatch
  })

  return (
    <section id="writings" className="min-h-screen py-20 md:py-24 px-6 md:px-6 bg-beige-light">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-light mb-3 text-black">
            {messages.writings.title}
          </h2>
          <p className="text-base md:text-base text-gray-500 font-light mb-8 md:mb-8">
            {messages.writings.subtitle}
          </p>

          {/* Filters */}
          {(categories.length > 1 || tags.length > 1) && (
            <div className="mb-8 md:mb-8 space-y-5">
              {/* Category Filter */}
              {categories.length > 1 && (
                <div>
                  <p className="text-sm md:text-sm font-medium mb-3">Category</p>
                  {/* 모바일: 횡스크롤, 데스크톱: flex-wrap */}
                  <div className="flex md:flex-wrap overflow-x-auto md:overflow-x-visible no-scrollbar gap-2.5 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2.5 md:px-4 md:py-2 text-sm md:text-sm rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                          selectedCategory === category
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
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
                  {/* 모바일: 횡스크롤, 데스크톱: flex-wrap */}
                  <div className="flex md:flex-wrap overflow-x-auto md:overflow-x-visible no-scrollbar gap-2.5 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 md:px-3 md:py-1 text-sm md:text-xs rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                          selectedTag === tag
                            ? 'bg-beige-dark text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
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
            <p className="text-sm md:text-base">Loading writings...</p>
          </div>
        ) : filteredWritings.length > 0 ? (
          <ImageGallery items={filteredWritings} type="writings" />
        ) : (
          <div className="text-center py-12 md:py-20 text-gray-400">
            <p className="text-3xl md:text-4xl mb-4">✍️</p>
            <p className="text-sm md:text-base">{messages.writings.empty}</p>
          </div>
        )}
      </div>
    </section>
  )
}
