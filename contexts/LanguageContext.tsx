'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import ko from '@/messages/ko.json'
import en from '@/messages/en.json'

type Locale = 'ko' | 'en'
type Messages = typeof ko

interface LanguageContextType {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko')

  useEffect(() => {
    // Load locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'ko' || savedLocale === 'en')) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const messages = locale === 'ko' ? ko : en

  return (
    <LanguageContext.Provider value={{ locale, messages, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
