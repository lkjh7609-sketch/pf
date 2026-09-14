'use client'

import { motion } from 'framer-motion'
import ImageGallery from './ImageGallery'
import { projectsData } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-600 mb-32">내가 작업한 프로젝트들</p>
        </motion.div>

        <ImageGallery items={projectsData} />
      </div>
    </section>
  )
}
