import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

describe('Design System - Button Component', () => {
  test('renders default variant correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i }))
      .toHaveClass('bg-primary')
      .toHaveClass('text-primary-foreground')
  })

  test('renders organic variant correctly', () => {
    render(<Button variant="organic">Organic</Button>)
    expect(screen.getByRole('button', { name: /organic/i }))
      .toHaveClass('bg-primary/10')
      .toHaveClass('text-primary')
      .toHaveClass('border')
      .toHaveClass('border-primary/20')
  })

  test('applies hover styles', () => {
    render(<Button>Hover me</Button>)
    const button = screen.getByRole('button', { name: /hover me/i })

    // Simulate hover
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    expect(button).toHaveClass('hover:bg-primary/90')
  })
})

describe('Design System - Input Component', () => {
  test('renders with organic variant', () => {
    render(<Input variant="organic" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)

    expect(input).toHaveClass('bg-background/80')
    .toHaveClass('backdrop-blur-sm')
    .toHaveClass('border')
    .toHaveClass('border-primary/20')
  })

  test('shows focus state', () => {
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

describe('Design System - Card Component', () => {
  test('renders organic variant', () => {
    render(<Card variant="organic"><p>Content</p></Card>)
    expect(screen.getByText(/content/i))
      .toHaveClass('border')
      .toHaveClass('border-primary/10')
      .toHaveClass('bg-primary/5')
  })

  test('applies hover elevation', () => {
    render(<Card variant="interactive"><p>Content</p></Card>)
    const card = screen.getByText(/content/i)

    // Simulate hover
    card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    expect(card).toHaveClass('hover:scale-[1.02]')
  })
})

describe('Design System - Badge Component', () => {
  test('renders organic badge', () => {
    render(<Badge variant="organic">Eco</Badge>)
    expect(screen.getByText(/eco/i))
      .toHaveClass('bg-primary/20')
      .toHaveClass('text-primary')
      .toHaveClass('border')
      .toHaveClass('border-primary/30')
  })
})