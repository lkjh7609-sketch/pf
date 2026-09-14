'use client'

import AnimatedSection from './AnimatedSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { messages } = useLanguage()

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedSection>
          {messages.contact.title && (
            <h2 className="text-3xl font-light mb-4 text-black dark:text-white">{messages.contact.title}</h2>
          )}
          <div className="w-16 h-px bg-gray-300 dark:bg-gray-600 mx-auto mb-6"></div>
          <p className="text-gray-500 dark:text-gray-400 font-light mb-8">
            {messages.contact.subtitle}
          </p>
          <a
            href="mailto:javerdose@gmail.com"
            className="inline-block px-8 py-3 border border-black dark:border-white text-sm font-light
                       text-black dark:text-white hover:bg-black dark:hover:bg-white
                       hover:text-white dark:hover:text-black transition-all duration-300"
          >
            javerdose@gmail.com
          </a>
        </AnimatedSection>
        <div className="mt-16 text-xs text-gray-400 dark:text-gray-500 font-light">
          {messages.contact.copyright}
        </div>
      </div>
    </section>
  )
}
