'use client'

import { motion, AnimatePresence } from 'framer-motion'
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

const ITEMS_PER_PAGE = 6

export default function ImageGallery({ items, type = 'projects' }: ImageGalleryProps) {
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = items.slice(startIndex, endIndex)

  const handleThumbnailError = (itemId: string) => {
    setThumbnailErrors((prev) => new Set(prev).add(itemId))
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  <h3 className="font-semibold text-lg md:text-lg mb-2 group-hover:text-beige-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-sm line-clamp-2">{item.description}</p>

                  {item.link && (
                    <div className="mt-2 text-sm md:text-xs text-blue-600">
                      External Link ↗
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Arrow Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-all ${
              currentPage === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:scale-110'
            }`}
            aria-label="Previous page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-sm text-gray-600 font-medium">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full transition-all ${
              currentPage === totalPages - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 hover:scale-110'
            }`}
            aria-label="Next page"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
