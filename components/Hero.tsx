'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { messages } = useLanguage()

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-6 bg-beige-light">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4 md:mb-4 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {messages.hero.name}
          </motion.h1>

          <motion.p
            className="text-lg md:text-lg lg:text-xl text-gray-500 font-light mb-8 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {messages.hero.title}
          </motion.p>

          <motion.p
            className="text-base md:text-base lg:text-lg text-gray-600 font-light leading-relaxed px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {messages.hero.description}
            <br />
            {messages.hero.description2}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-4xl text-black"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
