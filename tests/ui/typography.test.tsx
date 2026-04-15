import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

describe('Typography System', () => {
  test('applies base typography to headings', () => {
    render(<h1>Test Heading</h1>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('font-serif')
    expect(heading).toHaveClass('text-4xl')
  })

  test('applies base typography to paragraphs', () => {
    render(<p>Test paragraph</p>)
    const paragraph = screen.getByText('Test paragraph')
    expect(paragraph).toHaveClass('text-base')
    expect(paragraph).toHaveClass('leading-relaxed')
  })
})

describe('Enhanced Input Component', () => {
  test('renders with organic variant', () => {
    render(<Input variant="organic" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)

    expect(input).toHaveClass('bg-background/80')
    .toHaveClass('backdrop-blur-sm')
    .toHaveClass('border')
    .toHaveClass('border-primary/20')
  })

  test('shows focus state with enhanced ring', () => {
    render(<Input variant="organic" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)

    // Simulate focus
    input.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
    expect(input).toHaveClass('bg-white/90')
    .toHaveClass('border-primary/50')
    .toHaveClass('ring-2')
    .toHaveClass('ring-primary/50')
  })
})

describe('Enhanced Textarea Component', () => {
  test('renders with organic variant', () => {
    render(<Textarea variant="organic" placeholder="Enter text" />)
    const textarea = screen.getByPlaceholderText(/enter text/i)

    expect(textarea).toHaveClass('bg-background/80')
    .toHaveClass('backdrop-blur-sm')
    .toHaveClass('border')
    .toHaveClass('border-primary/20')
  })
})

describe('Enhanced Button Component', () => {
  test('renders organic variant correctly', () => {
    render(<Button variant="organic">Organic Button</Button>)
    expect(screen.getByRole('button', { name: /organic button/i }))
      .toHaveClass('bg-primary/10')
      .toHaveClass('text-primary')
      .toHaveClass('border')
      .toHaveClass('border-primary/20')
  })

  test('renders pulse variant correctly', () => {
    render(<Button variant="pulse">Pulsing Button</Button>)
    const button = screen.getByRole('button', { name: /pulsing button/i })
    expect(button).toHaveClass('bg-primary')
    .toHaveClass('text-primary-foreground')
    .toHaveClass('relative')
    .toHaveClass('overflow-hidden')
  })
})