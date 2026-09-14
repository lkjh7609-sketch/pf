import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '../Navigation'
import { LanguageProvider } from '@/contexts/LanguageContext'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Navigation Component', () => {
  it('renders navigation with all menu items', () => {
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    )

    expect(screen.getByText('Ben Lee')).toBeInTheDocument()
    expect(screen.getByText('Board')).toBeInTheDocument()
    expect(screen.getByText('Writing')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    )

    const hamburgerButton = screen.getByLabelText('메뉴 열기')
    fireEvent.click(hamburgerButton)

    expect(screen.getByLabelText('메뉴 닫기')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', '메인 네비게이션')
  })
})
