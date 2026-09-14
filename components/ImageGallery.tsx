'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
}

export default function ImageGallery({ items }: ImageGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item)
    setSelectedImageIndex(0)
  }

  const handleClose = () => {
    setSelectedItem(null)
    setSelectedImageIndex(0)
  }

  const handleNextImage = () => {
    if (selectedItem?.images) {
      setSelectedImageIndex((prev) =>
        prev === selectedItem.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const handlePrevImage = () => {
    if (selectedItem?.images) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedItem.images!.length - 1 : prev - 1
      )
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-beige-light via-white to-beige">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-black/5 rounded-full" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-white rounded-lg p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedItem.title}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-4xl hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {selectedItem.images && selectedItem.images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-video bg-beige-light rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-500">이미지: {selectedItem.images[selectedImageIndex]}</p>
                  </div>

                  {selectedItem.images.length > 1 && (
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handlePrevImage}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      >
                        ←
                      </button>
                      <span className="px-4 py-2">
                        {selectedImageIndex + 1} / {selectedItem.images.length}
                      </span>
                      <button
                        onClick={handleNextImage}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-beige-light rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">이미지 없음</p>
                </div>
              )}

              {selectedItem.link && (
                <div className="mt-6">
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    자세히 보기 →
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
