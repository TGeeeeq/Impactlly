import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import './input.css' // Import enhanced input styles

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-file placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-border',
        flushed: 'border-b px-0',
        underlined: 'border-b px-0',
        organic: 'bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface InputVariantProps extends VariantProps<typeof inputVariants> {}

export default function Input(
  { className, variant, type, ...props }:
  React.PropsWithRef<InputVariantProps>
) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input }
