'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface NavItem {
  name: string
  id: string
  isLink?: boolean
}

export default function Navigation() {
  const { messages, locale, setLocale } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const NAV_ITEMS: NavItem[] = [
    { name: messages.nav.board, id: 'board', isLink: true },
    { name: messages.nav.guestbook, id: 'guestbook', isLink: true },
    { name: messages.nav.skills, id: 'skills' },
    { name: messages.nav.projects, id: 'projects' },
    { name: messages.nav.writing, id: 'writings' },
    { name: messages.nav.contact, id: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 모바일 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Escape 키로 모바일 메뉴 닫기
  useEffect(() => {
    if (!isMobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileOpen])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileOpen(false)
  }, [])

  const handleNavClick = useCallback(
    (item: NavItem) => {
      if (item.isLink) {
        setIsMobileOpen(false)
      } else {
        scrollToSection(item.id)
      }
    },
    [scrollToSection]
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      role="navigation"
      aria-label="메인 네비게이션"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileOpen
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-xl font-bold hover:opacity-70 transition-opacity"
          aria-label="홈으로 이동"
        >
          Ben Lee
        </button>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex gap-8 items-center" role="menubar">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              role="menuitem"
              href={item.isLink ? '/board' : `#${item.id}`}
              onClick={
                item.isLink
                  ? undefined
                  : (e) => {
                      e.preventDefault()
                      handleNavClick(item)
                    }
              }
              className="text-sm hover:text-beige-dark transition-colors cursor-pointer"
            >
              {item.name}
            </a>
          ))}

          {/* 언어 토글 버튼 */}
          <button
            onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
            className="px-3 py-1.5 rounded-md bg-beige-dark/10 hover:bg-beige-dark/20 transition-all text-xs font-medium"
            aria-label="Toggle language"
          >
            {locale === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
              isMobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
              isMobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
              isMobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="px-6 py-4 space-y-1 bg-white/95 backdrop-blur-md">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  role="menuitem"
                  href={item.isLink ? '/board' : `#${item.id}`}
                  onClick={
                    item.isLink
                      ? () => setIsMobileOpen(false)
                      : (e) => {
                          e.preventDefault()
                          handleNavClick(item)
                        }
                  }
                  className="block py-3 text-sm hover:text-beige-dark transition-colors"
                >
                  {item.name}
                </a>
              ))}

              {/* 모바일 토글 버튼 */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
                  className="w-full px-3 py-2 rounded-md bg-beige-dark/10 hover:bg-beige-dark/20 transition-all text-xs font-medium"
                  aria-label="Toggle language"
                >
                  {locale === 'ko' ? 'EN' : 'KO'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
