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
    { name: messages.nav.writing, id: 'writings' },
    { name: messages.nav.projects, id: 'projects' },
    { name: messages.nav.skills, id: 'skills' },
    { name: messages.nav.board, id: 'board', isLink: true },
    { name: messages.nav.guestbook, id: 'guestbook', isLink: true },
    { name: messages.nav.contact, id: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 모바일 메뉴 열림/닫힘 시 body 스크롤 제어
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
    <>
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
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-4 flex justify-between items-center">


          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex gap-8 items-center ml-auto" role="menubar">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                role="menuitem"
                href={item.isLink ? `/${item.id}` : `#${item.id}`}
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
          <div className="md:hidden flex items-center gap-3 ml-auto">
            {/* 모바일 언어 토글 */}
            <button
              onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
              className="px-3 py-2 rounded-md bg-beige-dark/10 hover:bg-beige-dark/20 transition-all text-xs font-medium min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle language"
            >
              {locale === 'ko' ? 'EN' : 'KO'}
            </button>

            <button
              className="flex flex-col gap-2 p-3 -mr-3 min-h-[44px] min-w-[44px] justify-center"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              <span
                className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
                  isMobileOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              />
              <span
                className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
                  isMobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
                  isMobileOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* 모바일 드롭다운 메뉴 - 네비바 아래로 펼침 */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              id="mobile-menu"
              role="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-gray-100/50"
            >
              <div className="bg-white/90 backdrop-blur-md px-4 py-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.id}
                    role="menuitem"
                    href={item.isLink ? `/${item.id}` : `#${item.id}`}
                    onClick={
                      item.isLink
                        ? () => setIsMobileOpen(false)
                        : (e) => {
                            e.preventDefault()
                            handleNavClick(item)
                          }
                    }
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    className="block px-2 py-3.5 text-sm font-light text-gray-800 hover:text-black hover:bg-beige-light/50 rounded-lg transition-colors active:scale-[0.98]"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 드롭다운 뒤 배경 오버레이 (메뉴 외부 클릭 시 닫기) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 md:hidden z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

