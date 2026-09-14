import { render, screen } from '@testing-library/react'
import Hero from '../Hero'
import { LanguageProvider } from '@/contexts/LanguageContext'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

describe('Hero Component', () => {
  it('renders hero section with Korean text by default', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    )

    expect(screen.getByText('Ben Lee')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText(/안녕하세요/)).toBeInTheDocument()
  })

  it('has correct structure', () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    )

    const section = document.querySelector('#hero')
    expect(section).toBeInTheDocument()
  })
})
