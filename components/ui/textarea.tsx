import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import './textarea.css' // Import enhanced textarea styles

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background
         px-3 py-2 text-sm resize-y placeholder:text-muted-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
         focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

export interface TextareaVariantProps extends VariantProps<typeof textareaVariants> {}

export default function Textarea(
  { className, variant, ...props }:
  React.PropsWithRef<TextareaVariantProps>
) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    )
  )
}