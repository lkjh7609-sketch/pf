'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  const toggleLanguage = () => {
    setLocale(locale === 'ko' ? 'en' : 'ko')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-8 right-24 z-50 px-4 py-2 rounded-full bg-beige-dark dark:bg-gray-800 shadow-lg transition-all hover:scale-110 text-sm font-medium text-gray-800 dark:text-white"
      aria-label="Toggle language"
    >
      {locale === 'ko' ? 'EN' : 'KO'}
    </button>
  )
}
