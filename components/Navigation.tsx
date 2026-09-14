'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from 'next-themes'

interface NavItem {
  name: string
  id: string
  isLink?: boolean
}

export default function Navigation() {
  const { messages, locale, setLocale } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const NAV_ITEMS: NavItem[] = [
    { name: messages.nav.board, id: 'board', isLink: true },
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
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
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
            className="px-3 py-1.5 rounded-md bg-beige-dark/10 dark:bg-gray-800/50 hover:bg-beige-dark/20 dark:hover:bg-gray-700 transition-all text-xs font-medium"
            aria-label="Toggle language"
          >
            {locale === 'ko' ? 'EN' : 'KO'}
          </button>

          {/* 테마 토글 버튼 */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-md bg-beige-dark/10 dark:bg-gray-800/50 hover:bg-beige-dark/20 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          )}
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
            <div className="px-6 py-4 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
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

              {/* 모바일 토글 버튼들 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
                  className="flex-1 px-3 py-2 rounded-md bg-beige-dark/10 dark:bg-gray-800 hover:bg-beige-dark/20 dark:hover:bg-gray-700 transition-all text-xs font-medium"
                  aria-label="Toggle language"
                >
                  {locale === 'ko' ? 'EN' : 'KO'}
                </button>

                {mounted && (
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex-1 px-3 py-2 rounded-md bg-beige-dark/10 dark:bg-gray-800 hover:bg-beige-dark/20 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-xs font-medium"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <>
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Light
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                        Dark
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
