'use client'

import { writingsData } from '@/data/writings'
import ImageGallery from './ImageGallery'
import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Writings() {
  const { messages } = useLanguage()

  return (
    <section id="writings" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl font-light mb-2 text-black">{messages.writings.title}</h2>
          <p className="text-gray-500 font-light mb-16">{messages.writings.subtitle}</p>
        </AnimatedSection>

        {writingsData.length > 0 ? (
          <ImageGallery items={writingsData} />
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
