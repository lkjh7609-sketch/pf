'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'

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
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set())
  const [modalImageError, setModalImageError] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleItemClick = (item: GalleryItem) => {
    previousFocusRef.current = document.activeElement as HTMLElement
    setSelectedItem(item)
    setSelectedImageIndex(0)
    setModalImageError(false)
  }

  const handleClose = useCallback(() => {
    setSelectedItem(null)
    setSelectedImageIndex(0)
    setModalImageError(false)
    // 포커스를 이전 요소로 복원
    previousFocusRef.current?.focus()
  }, [])

  const handleNextImage = useCallback(() => {
    if (selectedItem?.images) {
      setSelectedImageIndex((prev) =>
        prev === selectedItem.images!.length - 1 ? 0 : prev + 1
      )
      setModalImageError(false)
    }
  }, [selectedItem])

  const handlePrevImage = useCallback(() => {
    if (selectedItem?.images) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedItem.images!.length - 1 : prev - 1
      )
      setModalImageError(false)
    }
  }, [selectedItem])

  // 키보드 네비게이션
  useEffect(() => {
    if (!selectedItem) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose()
          break
        case 'ArrowRight':
          handleNextImage()
          break
        case 'ArrowLeft':
          handlePrevImage()
          break
        case 'Tab':
          // 포커스 트래핑: 모달 내부에서만 Tab 순환
          if (modalRef.current) {
            const focusable = modalRef.current.querySelectorAll<HTMLElement>(
              'button, [href], [tabindex]:not([tabindex="-1"])'
            )
            if (focusable.length === 0) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]

            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault()
              last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItem, handleClose, handleNextImage, handlePrevImage])

  // 모달 열릴 때: 닫기 버튼에 포커스 + body 스크롤 잠금
  useEffect(() => {
    if (selectedItem) {
      closeButtonRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedItem])

  const handleThumbnailError = (itemId: string) => {
    setThumbnailErrors((prev) => new Set(prev).add(itemId))
  }

  // 빈 상태
  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 font-light">
        <p className="text-4xl mb-4">📂</p>
        <p>아직 등록된 항목이 없습니다</p>
      </div>
    )
  }

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        role="list"
        aria-label="갤러리 목록"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="cursor-pointer"
            onClick={() => handleItemClick(item)}
            tabIndex={0}
            aria-label={`${item.title} 상세 보기`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleItemClick(item)
              }
            }}
          >
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              {item.thumbnail && !thumbnailErrors.has(item.id) ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title} - ${item.description}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    onError={() => handleThumbnailError(item.id)}
                    priority={index < 3}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-beige-light via-white to-beige">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-black/5 rounded-full flex items-center justify-center">
                      <span className="text-3xl" aria-hidden="true">
                        📁
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              )}
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
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} 갤러리`}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-white rounded-lg p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-black">{selectedItem.title}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="text-4xl hover:text-gray-600 transition-colors flex-shrink-0 ml-4"
                  aria-label="갤러리 닫기"
                >
                  ×
                </button>
              </div>

              {selectedItem.images && selectedItem.images.length > 0 ? (
                <div className="relative">
                  <div className="aspect-video bg-beige-light rounded-lg overflow-hidden flex items-center justify-center mb-4 relative">
                    {!modalImageError ? (
                      <Image
                        src={selectedItem.images[selectedImageIndex]}
                        alt={`${selectedItem.title} - 이미지 ${selectedImageIndex + 1}`}
                        fill
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-contain"
                        onError={() => setModalImageError(true)}
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <p className="text-4xl mb-2" aria-hidden="true">
                          🖼️
                        </p>
                        <p>이미지를 불러올 수 없습니다</p>
                        <p className="text-sm mt-1">
                          {selectedItem.images[selectedImageIndex]}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedItem.images.length > 1 && (
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handlePrevImage}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                        aria-label="이전 이미지"
                      >
                        ←
                      </button>
                      <span className="px-4 py-2" aria-live="polite">
                        {selectedImageIndex + 1} / {selectedItem.images.length}
                      </span>
                      <button
                        onClick={handleNextImage}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                        aria-label="다음 이미지"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-beige-light rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p className="text-4xl mb-2" aria-hidden="true">
                      📷
                    </p>
                    <p>이미지 없음</p>
                  </div>
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
