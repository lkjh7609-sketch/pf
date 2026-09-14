import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '../ThemeToggle'
import { ThemeProvider } from '../ThemeProvider'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: any) => <div>{children}</div>,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}))

describe('ThemeToggle Component', () => {
  it('renders theme toggle button', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByLabelText('Toggle theme')
    expect(button).toBeInTheDocument()
  })

  it('has correct positioning classes', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByLabelText('Toggle theme')
    expect(button).toHaveClass('fixed', 'top-8', 'right-8', 'z-50')
  })
})
