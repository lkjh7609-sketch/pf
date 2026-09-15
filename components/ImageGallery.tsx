'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

interface GalleryItem {
  id: string
  title: string
  description: string
  thumbnail: string
  images?: string[]
  link?: string
}

interface ImageGalleryProps {
  items: GalleryItem[]
  type?: 'projects' | 'writings'
}

export default function ImageGallery({ items, type = 'projects' }: ImageGalleryProps) {
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set())

  const handleThumbnailError = (itemId: string) => {
    setThumbnailErrors((prev) => new Set(prev).add(itemId))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/${type}/${item.id}`}>
            <div className="group cursor-pointer">
              {/* Thumbnail */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
                {!thumbnailErrors.has(item.id) ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleThumbnailError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🖼️</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-beige-dark transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>

              {item.link && (
                <div className="mt-2 text-xs text-blue-600">
                  External Link ↗
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
