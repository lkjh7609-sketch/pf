'use client'

import { useState, useEffect } from 'react'
import ImageGallery from './ImageGallery'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

interface Writing {
  id: string
  title: string
  description: string
  thumbnail: string
  images: string[]
  link?: string
}

export default function Writings() {
  const { messages } = useLanguage()
  const [writings, setWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWritings() {
      try {
        const response = await fetch('/api/writings')
        if (!response.ok) {
          throw new Error('Failed to fetch writings')
        }
        const data = await response.json()
        setWritings(data)
      } catch (err) {
        console.error('Error fetching writings:', err)
        setError(err instanceof Error ? err.message : 'Failed to load writings')
      } finally {
        setLoading(false)
      }
    }

    fetchWritings()
  }, [])

  if (loading) {
    return (
      <section id="writings" className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-light mb-2 text-black">{messages.writings.title}</h2>
            <p className="text-gray-500 font-light mb-16">{messages.writings.subtitle}</p>
          </AnimatedSection>
          <div className="text-center py-20 text-gray-400 font-light">
            <p className="text-4xl mb-4">⏳</p>
            <p>Loading writings...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="writings" className="min-h-screen py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-light mb-2 text-black">{messages.writings.title}</h2>
            <p className="text-gray-500 font-light mb-16">{messages.writings.subtitle}</p>
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
    <section id="writings" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2 text-black">{messages.writings.title}</h2>
          <p className="text-gray-500 font-light mb-16">{messages.writings.subtitle}</p>
        </AnimatedSection>

        {writings.length > 0 ? (
          <ImageGallery items={writings} />
        ) : (
          <div className="text-center py-20 text-gray-400 font-light">
            <p className="text-4xl mb-4">✍️</p>
            <p>{messages.writings.empty}</p>
          </div>
        )}
      </div>
    </section>
  )
}
