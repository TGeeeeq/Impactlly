import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import './card.css' // Import enhanced card styles

const cardVariants = cva(
  'flex flex-col gap-6 rounded-xl border py-6',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground shadow-sm',
        outline: 'border border-card/50',
        raised: 'shadow-md hover:shadow-lg',
        organic: 'bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20',
        nature: 'bg-green-50/50 border border-green-100/30 hover:bg-green-100/30 hover:border-green-200/40',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    }
  }
)

export interface CardVariantProps extends VariantProps<typeof cardVariants> {}

function Card({ className, variant, size, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, size, className })
      )}
      {...props}
    />
  )
}

const cardHeaderVariants = cva(
  '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
  {
    variants: {
      variant: {
        default: '',
        compact: 'gap-1 px-4',
        spacious: 'gap-4 px-8 pb-8',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardHeaderVariantProps extends VariantProps<typeof cardHeaderVariants> {}

function CardHeader({ className, variant, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardHeaderVariants>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        cardHeaderVariants({ variant, className })
      )}
      {...props}
    />
  )
}

const cardTitleVariants = cva(
  'leading-none font-semibold',
  {
    variants: {
      variant: {
        default: '',
        condensed: 'tracking-tighter',
        elegant: 'tracking-wide',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardTitleVariantProps extends VariantProps<typeof cardTitleVariants> {}

function CardTitle({ className, variant, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardTitleVariants>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        cardTitleVariants({ variant, className })
      )}
      {...props}
    />
  )
}

const cardDescriptionVariants = cva(
  'text-muted-foreground text-sm',
  {
    variants: {
      variant: {
        default: '',
        subtle: 'text-muted-foreground/70',
        accent: 'text-primary',
        body: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardDescriptionVariantProps extends VariantProps<typeof cardDescriptionVariants> {}

function CardDescription({ className, variant, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardDescriptionVariants>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        cardDescriptionVariants({ variant, className })
      )}
      {...props}
    />
  )
}

const cardActionVariants = cva(
  'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
  {
    variants: {
      variant: {
        default: '',
        start: 'self-start justify-start',
        center: 'self-center justify-center',
        end: 'self-end justify-end',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardActionVariantProps extends VariantProps<typeof cardActionVariants> {}

function CardAction({ className, variant, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardActionVariants>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        cardActionVariants({ variant, className })
      )}
      {...props}
    />
  )
}

const cardContentVariants = cva(
  'px-6',
  {
    variants: {
      variant: {
        default: 'p-4',
        compact: 'p-2',
        spacious: 'p-8',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardContentVariantProps extends VariantProps<typeof cardContentVariants> {}

function CardContent({ className, variant, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardContentVariants>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        cardContentVariants({ variant, className })
      )}
      {...props}
    />
  )
}

const cardFooterVariants = cva(
  'flex items-center px-6 [.border-t]:pt-6',
  {
    variants: {
      variant: {
        default: '',
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        spaced: 'justify-between',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardFooterVariantProps extends VariantProps<typeof cardFooterVariants> {}

function CardFooter({ className, variant, ...props }: React.ComponentProps<'div'> &
  VariantProps<typeof cardFooterVariants>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        cardFooterVariants({ variant, className })
      )}
      {...props}
    /
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
