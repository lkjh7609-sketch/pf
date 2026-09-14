import { render, screen } from '@testing-library/react'
import Contact from '../Contact'
import { LanguageProvider } from '@/contexts/LanguageContext'

// Mock AnimatedSection
jest.mock('../AnimatedSection', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}))

describe('Contact Component', () => {
  it('renders contact section with Korean text', () => {
    render(
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    )

    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByText(/프로젝트 문의나 협업 제안/)).toBeInTheDocument()
  })

  it('renders email link correctly', () => {
    render(
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    )

    const emailLink = screen.getByRole('link', { name: /javerdose@gmail.com/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:javerdose@gmail.com')
  })

  it('displays copyright information', () => {
    render(
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    )

    expect(screen.getByText(/© 2026 Ben Lee/)).toBeInTheDocument()
  })
})
