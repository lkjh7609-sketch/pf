'use client'

import { motion } from 'framer-motion'
import ImageGallery from './ImageGallery'
import { writingsData } from '@/data/writings'

export default function Writings() {
  return (
    <section id="writings" className="min-h-screen py-24 px-6 bg-beige-light">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Writing</h2>
          <p className="text-gray-600 mb-32">생각과 경험을 공유합니다</p>
        </motion.div>

        <ImageGallery items={writingsData} />
      </div>
    </section>
  )
}
