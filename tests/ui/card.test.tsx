import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card } from '@/components/ui/card'

describe('Card Component', () => {
  test('renders with default variant', () => {
    render(<Card>Default Card</Card>)
    const card = screen.getByText('Default Card')
    expect(card).toHaveClass('bg-card')
    expect(card).toHaveClass('text-card-foreground')
  })

  test('renders with outline variant', () => {
    render(<Card variant="outline">Outlined Card</Card>)
    const card = screen.getByText('Outlined Card')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-card/50')
  })

  test('renders with raised variant', () => {
    render(<Card variant="raised">Raised Card</Card>)
    const card = screen.getByText('Raised Card')
    expect(card).toHaveClass('shadow-md')
  })

  test('renders with organic variant', () => {
    render(<Card variant="organic">Organic Card</Card>)
    const card = screen.getByText('Organic Card')
    expect(card).toHaveClass('bg-primary/5')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-primary/10')
  })

  test('renders with nature variant', () => {
    render(<Card variant="nature">Nature Card</Card>)
    const card = screen.getByText('Nature Card')
    expect(card).toHaveClass('bg-green-50/50')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-green-100/30')
  })

  test('renders with size variations', () => {
    render(<Card size="sm">Small Card</Card>)
    const smallCard = screen.getByText('Small Card')
    expect(smallCard).toHaveClass('p-4')

    render(<Card size="lg">Large Card</Card>)
    const largeCard = screen.getByText('Large Card')
    expect(largeCard).toHaveClass('p-8')
  })

  test('applies custom className', () => {
    render(<Card className="border-2">Custom Class Card</Card>)
    const card = screen.getByText('Custom Class Card')
    expect(card).toHaveClass('border-2')
  })
})