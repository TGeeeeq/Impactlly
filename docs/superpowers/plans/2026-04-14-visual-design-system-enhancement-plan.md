# Visual Design System Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a distinctive nature-inspired visual design system that enhances the Impactlly app's identity and user experience while maintaining accessibility and usability.

**Architecture:** Create a cohesive design system through CSS variables, enhanced components, and nature-inspired micro-interactions that reflect the environmental mission without sacrificing functionality.

**Tech Stack:** CSS/SCSS, React, TypeScript, Framer Motion (for animations), Headless UI (for accessible components)

---
### Task 1: Foundation CSS Variables and Base Styles

**Files:**
- Create: `docs/superpowers/specs/2026-04-14-visual-design-system-enhancement-design.md` (already completed)
- Modify: `styles/globals.css:1-117`
- Create: `styles/theme-variables.css:1-50`
- Modify: `app/globals.css:1-20` (if exists, otherwise create)

- [ ] **Step 1: Define nature-inspired color palette as CSS variables**

```css
:root {
  /* Primary Nature Colors */
  --color-earth-green: #2D5D2C;
  --color-soil-brown: #8B7355;
  --color-sky-blue: #4A90E2;
  --color-sun-yellow: #F5A623;
  --color-leaf-green: #6B8E23;
  --color-clay-red: #CD5C5C;
  
  /* Nature-inspired Neutrals */
  --color-stone-white: #F8F6F3;
  --color-sand-beige: #F5F0E6;
  --color-slate-gray: #6B7280;
  --color-charcoal: #2F2F2F;
  
  /* Semantic Mappings (maintain accessibility) */
  --background: var(--color-stone-white);
  --foreground: var(--color-charcoal);
  --primary: var(--color-earth-green);
  --primary-foreground: var(--color-stone-white);
  --secondary: var(--color-soil-brown);
  --secondary-foreground: var(--color-stone-white);
  --accent: var(--color-sky-blue);
  --accent-foreground: var(--color-stone-white);
}
```

- [ ] **Step 2: Create theme variables file with complete system**

```css
/* Theme Variables File */
:root {
  /* Radius System - Organic, softer corners */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  
  /* Spacing System - Based on 4px grid with organic variations */
  --spacing-px: 1px;
  --spacing-0: 0px;
  --spacing-0-5: 2px;
  --spacing-1: 4px;
  --spacing-1-5: 6px;
  --spacing-2: 8px;
  --spacing-2-5: 10px;
  --spacing-3: 12px;
  --spacing-3-5: 14px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-14: 56px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-28: 112px;
  --spacing-32: 128px;
  
  /* Typography System */
  --font-serif: 'Cormorant Garamond', 'Playfair Display', serif;
  --font-sans: 'Inter', 'Lato', sans-serif;
  --font-mono: 'Geist Mono', 'Geist Mono Fallback', monospace;
  
  /* Transition Durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  
  /* Animation Timing Functions */
  --ease-organic: cubic-bezier(0.3, 0, 0.7, 1);
  --ease-nature: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-pulse: cubic-bezier(0.4, 0, 0.6, 1);
}
```

- [ ] **Step 3: Update base styles to use new variables**

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
  }
  
  /* Enhanced focus styles */
  :focus-visible {
    @apply outline-outline ring-2 ring-primary/50;
  }
}
```

- [ ] **Step 4: Create dark theme variables**

```css
.dark {
  /* Dark theme nature colors */
  --color-earth-green: #4A7C47;
  --color-soil-brown: #A58F6B;
  --color-sky-blue: #6BAED6;
  --color-sun-yellow: #F7B733;
  --color-leaf-green: #8AAE45;
  --color-clay-red: #D16B6B;
  
  /* Dark theme neutrals */
  --color-stone-white: #2D2D2D;
  --color-sand-beige: #3A372F;
  --color-slate-gray: #9CA3AF;
  --color-charcoal: #F8F6F3;
  
  /* Update semantic mappings for dark mode */
  --background: var(--color-charcoal);
  --foreground: var(--color-stone-white);
  --primary: var(--color-earth-green);
  --primary-foreground: var(--color-stone-white);
  --secondary: var(--color-soil-brown);
  --secondary-foreground: var(--color-stone-white);
  --accent: var(--color-sky-blue);
  --accent-foreground: var(--color-stone-white);
}
```

- [ ] **Step 5: Commit foundation styles**

```bash
git add styles/globals.css styles/theme-variables.css app/globals.css
git commit -m "feat: establish nature-inspired design system foundation with CSS variables"
```

### Task 2: Enhanced Typography System

**Files:**
- Modify: `styles/globals.css:118-`
- Create: `styles/typography.css:1-40`
- Modify: `app/globals.css:20-` (append to existing)

- [ ] **Step 1: Define typography scale with nature-inspired proportions**

```css
/* Typography Scale */
:root {
  /* Fluid typography that scales with viewport */
  --font-size-0: clamp(0.65rem, 0.55rem + 0.3vw, 0.85rem);
  --font-size-1: clamp(0.75rem, 0.63rem + 0.35vw, 0.95rem);
  --font-size-2: clamp(0.875rem, 0.75rem + 0.4vw, 1.1rem);
  --font-size-3: clamp(1rem, 0.85rem + 0.45vw, 1.25rem);
  --font-size-4: clamp(1.125rem, 0.95rem + 0.5vw, 1.4rem);
  --font-size-5: clamp(1.25rem, 1.05rem + 0.55vw, 1.6rem);
  --font-size-6: clamp(1.5rem, 1.25rem + 0.6vw, 1.9rem);
  --font-size-7: clamp(1.75rem, 1.45rem + 0.65vw, 2.2rem);
  --font-size-8: clamp(2rem, 1.65rem + 0.7vw, 2.5rem);
  --font-size-9: clamp(2.25rem, 1.85rem + 0.75vw, 2.8rem);
  --font-size-10: clamp(2.5rem, 2.05rem + 0.8vw, 3.2rem);
  
  /* Font weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* Line heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  --line-height-loose: 2.0;
}
```

- [ ] **Step 2: Create utility classes for typography**

```css
/* Typography Utility Classes */
.text-xs { font-size: var(--font-size-0); }
.text-sm { font-size: var(--font-size-1); }
.text-base { font-size: var(--font-size-2); }
.text-lg { font-size: var(--font-size-3); }
.text-xl { font-size: var(--font-size-4); }
.text-2xl { font-size: var(--font-size-5); }
.text-3xl { font-size: var(--font-size-6); }
.text-4xl { font-size: var(--font-size-7); }
.text-5xl { font-size: var(--font-size-8); }
.text-6xl { font-size: var(--font-size-9); }
.text-7xl { font-size: var(--font-size-10); }

.font-serif { font-family: var(--font-serif); }
.font-sans { font-family: var(--font-sans); }
.font-mono { font-family: var(--font-mono); }

.italic { font-style: italic; }
.not-italic { font-style: normal; }

.leading-none { line-height: 1; }
.leading-tight { line-height: var(--line-height-tight); }
.leading-snappy { line-height: 1.375; }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }
.leading-loose { line-height: var(--line-height-loose); }

.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: 0; }
.tracking-wide { letter-spacing: 0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-widest { letter-spacing: 0.1em; }
```

- [ ] **Step 3: Update global CSS to include typography**

```css
@layer base {
  /* ... existing base styles ... */
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-bold tracking-tight;
  }
  
  h1 { @apply text-4xl sm:text-5xl; }
  h2 { @apply text-3xl sm:text-4xl; }
  h3 { @apply text-2xl sm:text-3xl; }
  h4 { @apply text-xl sm:text-2xl; }
  h5 { @apply text-lg sm:text-xl; }
  h6 { @apply text-base sm:text-lg; }
  
  p { @apply text-base leading-relaxed; }
  
  /* Enhanced form elements */
  input, textarea, select {
    @apply bg-background/80 backdrop-blur-sm border border-input/50 
           rounded-md px-3 py-2 text-sm focus:outline-none 
           focus:ring-2 focus:ring-primary/20 focus:border-primary/50
           transition-all duration-200;
  }
  
  input:focus, textarea:focus, select:focus {
    @apply bg-white/90 border-primary/70;
  }
}
```

- [ ] **Step 4: Commit typography enhancements**

```bash
git add styles/globals.css styles/typography.css app/globals.css
git commit -m "feat: implement nature-inspired typography system with fluid scaling"
```

### Task 3: Enhanced Button Components

**Files:**
- Modify: `components/ui/button.tsx:1-50`
- Create: `components/ui/button.css:1-30`
- Modify: `components/ui/button.tsx:50-` (enhanced implementation)

- [ ] **Step 1: Create enhanced button styles with nature interactions**

```css
/* Enhanced Button Styles */
.button-base {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent 
         text-sm font-medium rounded-md shadow-sm 
         focus:outline-none focus:ring-2 offset-ring-2 focus:ring-offset-2
         disabled:opacity-50 disabled:pointer-events-none 
         transition-all duration-200;
}

.button-primary {
  @apply button-base bg-primary text-primary-foreground hover:bg-primary/90 
         focus:ring-primary/50 active:bg-primary/80;
}

.button-secondary {
  @apply button-base bg-secondary text-secondary-foreground 
         hover:bg-secondary/90 focus:ring-secondary/50 
         active:bg-secondary/80;
}

.button-outline {
  @apply button-base border border-primary/50 text-primary 
         hover:bg-primary/5 focus:ring-primary/50 
         active:bg-primary/10;
}

.button-destructive {
  @apply button-base bg-destructive text-destructive-foreground 
         hover:bg-destructive/90 focus:ring-destructive/50 
         active:bg-destructive/80;
}

/* Nature-inspired button variations */
.button-organic {
  @apply button-base bg-primary/10 text-primary hover:bg-primary/20 
         border border-primary/20 focus:ring-primary/30;
}

.button-organic:hover {
  @apply transform scale-105;
}

.button-organic:active {
  @apply transform scale-95;
}

/* Button sizes */
.button-xs { @apply px-2 py-1 text-xs; }
.button-sm { @apply px-3 py-2 text-sm; }
.button-md { @apply px-4 py-3 text-base; }
.button-lg { @apply px-5 py-4 text-lg; }
.button-xl { @apply px-6 py-5 text-xl; }

/* Button variants with nature effects */
.button-pulse {
  @apply button-base bg-primary text-primary-foreground;
}

.button-pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.3; }
  50% { transform: scale(1.05); opacity: 0.6; }
  100% { transform: scale(0.95); opacity: 0.3; }
}

.button-float {
  @apply button-base bg-primary text-primary-foreground 
         shadow-lg hover:shadow-xl transition-shadow;
}

.button-float:hover {
  @apply transform -translate-y-1;
}

.button-float:active {
  @apply transform translate-y-0;
}
```

- [ ] **Step 2: Update button component with enhanced variants**

```typescript
'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-focus transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent/accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent/accent',
        link: 'text-primary underline-offset-4 hover:underline',
        organic: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
        pulse: 'bg-primary text-primary-foreground relative overflow-hidden',
        float: 'bg-primary text-primary-foreground shadow-md hover:shadow-lg'
      },
      size: {
        xs: 'h-7 px-2',
        sm: 'h-8 px-3',
        md: 'h-9 px-4',
        lg: 'h-10 px-5',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    }
  }
)

export interface ButtonVariantProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export default function Button(
  { className, variant, size, asChild = false, ...props }: 
  React.PropsWithRef<ButtonVariantProps> & { asChild?: boolean }
) {
  const Comp = asChild ? 'button' : React.forwardRef<HTMLButtonElement, ButtonVariantProps>(
    ({ className, ...rest }, ref) => (
      <button 
        ref={ref} 
        className={cn(buttonVariants({ variant, size }), className)} 
        {...rest} 
      />
    )
  )
  
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
```

- [ ] **Step 3: Add pulse animation to button component**

```typescript
// Add to button.tsx after imports
import './button.css' // Import the enhanced styles

// In the component, add pulse variant logic
export default function Button(
  { className, variant, size, asChild = false, ...props }: 
  React.PropsWithRef<ButtonVariantProps> & { asChild?: boolean }
) {
  // ... existing code ...
  
  // Add pulse animation elements for pulse variant
  if (variant === 'pulse') {
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size }), className)} 
        {...props} 
      >
        <span className="absolute inset-0 bg-primary/20 animate-pulse" aria-hidden="true" />
        {props.children}
      </Comp>
    )
  }
  
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
```

- [ ] **Step 4: Commit enhanced button components**

```bash
git add components/ui/button.tsx components/ui/button.css
git commit -m "feat: implement enhanced button components with nature-inspired interactions"
```

### Task 4: Enhanced Input and Form Elements

**Files:**
- Modify: `components/ui/input.tsx:1-40`
- Modify: `components/ui/textarea.tsx:1-30`
- Modify: `components/ui/select.tsx:1-30` (if exists)
- Create: `components/ui/form-field.css:1-40`

- [ ] **Step 1: Create enhanced input styles with nature feedback**

```css
/* Enhanced Input Styles */
.input-base {
  @apply flex h-10 w-full rounded-md border border-input bg-background 
         px-3 py-2 text-sm ring-offset-file placeholder:text-muted-foreground 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
         focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

.input-with-icon {
  @apply flex items-center w-full;
}

.input-with-icon > *:first-child {
  @apply flex h-10 items-center justify-center px-3 text-muted-foreground 
         border-r border-input;
}

.input-with-icon > *:last-child {
  @apply flex-h w-full pl-2 pr-3;
}

/* Nature-inspired input states */
.input-focused {
  @apply ring-2 ring-primary/50 border-primary/70;
}

.input-success {
  @apply ring-2 ring-success/50 border-success/60;
}

.input-error {
  @apply ring-2 ring-destructive/50 border-destructive/60;
}

/* Organic input variations */
.input-organic {
  @apply input-base bg-background/80 backdrop-blur-sm 
         border border-primary/20 hover:border-primary/30;
}

.input-organic:focus {
  @apply bg-white/90 border-primary/50 ring-2 ring-primary/50;
}

/* Textarea enhancements */
.textarea-base {
  @apply flex min-h-[80px] w-full rounded-md border border-input bg-background 
         px-3 py-2 text-sm resize-y placeholder:text-muted-foreground 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
         focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

.textarea-organic {
  @apply textarea-base bg-background/80 backdrop-blur-sm 
         border border-primary/20 hover:border-primary/30;
}

.textarea-organic:focus {
  @apply bg-white/90 border-primary/50 ring-2 ring-primary/50;
}

/* Select enhancements */
.select-base {
  @apply flex h-10 w-full rounded-md border border-input bg-background 
         px-3 py-2 text-sm ring-offset-file placeholder:text-muted-foreground 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
         focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

.select-organic {
  @apply select-base bg-background/80 backdrop-blur-sm 
         border border-primary/20 hover:border-primary/30;
}

.select-organic:focus {
  @apply bg-white/90 border-primary/50 ring-2 ring-primary/50;
}
```

- [ ] **Step 2: Update input component with enhanced variants**

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import './input.css' // Import enhanced styles

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-file placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-border',
        flushed: 'border-b px-0',
        underlined: 'border-b px-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface InputVariantProps extends VariantProps<typeof inputVariants> {}

export default function Input(
  { className, variant, ...props }: 
  React.PropsWithRef<InputVariantProps>
) {
  return (
    <input 
      type="text"
      className={cn(inputVariants({ variant }), className)} 
      {...props} 
    />
  )
}
```

- [ ] **Step 3: Update textarea component similarly**

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import './textarea.css' // Import enhanced styles

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-border',
        flushed: 'border-b px-0',
        underlined: 'border-b px-0',
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
      className={cn(textareaVariants({ variant }), className)} 
      {...props} 
    />
  )
}
```

- [ ] **Step 4: Create enhanced form field container**

```css
/* Form Field Enhancements */
.form-field {
  @apply space-y-2;
}

.form-field-label {
  @apply text-sm font-medium text-muted-foreground dark:text-muted-foreground/40;
}

.form-field-description {
  @apply text-xs text-muted-foreground dark:text-muted-foreground/40;
}

.form-field-message {
  @apply text-xs font-medium rounded-md px-2 py-1;
}

.form-field-message-error {
  @apply bg-destructive/10 text-destructive;
}

.form-field-message-success {
  @apply bg-success/10 text-success;
}

/* Enhanced fieldset */
.form-fieldset {
  @apply space-y-4 pt-4;
}

.form-fieldset-legend {
  @apply text-xs font-medium text-muted-foreground 
         uppercase tracking-wider;
}
```

- [ ] **Step 5: Commit enhanced form elements**

```bash
git add components/ui/input.tsx components/ui/textarea.tsx components/ui/select.tsx components/ui/form-field.css
git commit -m "feat: implement enhanced input and form elements with nature-inspired feedback"
```

### Task 5: Enhanced Card and Surface Components

**Files:**
- Modify: `components/ui/card.tsx:1-40`
- Modify: `components/ui/badge.tsx:1-40`
- Create: `components/ui/surface.css:1-50`

- [ ] **Step 1: Create enhanced card styles with nature elevation**

```css
/* Enhanced Card Styles */
.card-base {
  @apply rounded-xl border border-background/20 bg-background 
         bg-clip-padding backdrop-blur-lg 
         shadow-sm hover:shadow-md transition-shadow duration-300;
}

.card-elevated {
  @apply shadow-lg hover:shadow-xl transition-shadow duration-300;
}

.card-interactive {
  @apply cursor-pointer hover:scale-[1.02] active:scale-[0.98] 
         transition-transform duration-200;
}

.card-organic {
  @apply card-base border border-primary/10 bg-primary/5;
}

.card-organic:hover {
  @apply border-border-primary/20 bg-primary/10;
}

.card-nature {
  @apply card-base border border-green-100/30 bg-green-50/50;
}

.card-nature:hover {
  @apply border-green-200/40 bg-green-100/30;
}

/* Surface variations */
.surface-pane {
  @apply rounded-xl border border-border/20 bg-background 
         bg-clip-padding backdrop-blur-md 
         shadow-inner hover:shadow-md transition-shadow;
}

.surface-elevated {
  @apply shadow-md hover:shadow-lg transition-shadow duration-300;
}

.surface-transparent {
  @apply bg-transparent backdrop-blur-sm;
}

.surface-glass {
  @apply bg-background/60 backdrop-blur-lg border border-background/20 
         shadow-sm;
}

/* Badge enhancements */
.badge-base {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full 
         text-xs font-medium transition-all duration-200;
}

.badge-organic {
  @apply badge-base bg-primary/20 text-primary 
         border border-primary/30 hover:bg-primary/30;
}

.badge-success {
  @apply badge-base bg-success/20 text-success 
         border border-success/30 hover:bg-success/30;
}

.badge-outline {
  @apply badge-base border border-input/20 text-current 
         hover:bg-input/10;
}

.badge-soft {
  @apply badge-base bg-primary/10 text-primary 
         font-medium;
}
```

- [ ] **Step 2: Update card component with enhanced variants**

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import './card.css' // Import enhanced styles

const cardVariants = cva(
  'rounded-xl border border-background/20 bg-background bg-clip-padding backdrop-blur-lg',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        outline: 'border-border',
        elevated: 'shadow-lg',
        organic: 'border border-primary/10 bg-primary/5',
        nature: 'border border-green-100/30 bg-green-50/50',
        elevated: 'shadow-lg',
        interactive: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface CardVariantProps extends VariantProps<typeof cardVariants> {}

export default function Card(
  { className, variant, ...props }: 
  React.PropsWithRef<CardVariantProps> & { 
    asChild?: boolean 
  }
) {
  const Component = asChild ? 'div' : React.forwardRef<HTMLDivElement, CardVariantProps>(
    ({ className, ...rest }, ref) => (
      <div 
        ref={ref} 
        className={cn(cardVariants({ variant }), className)} 
        {...rest} 
      />
    )
  )
  
  return (
    <Component className={cn(cardVariants({ variant }), className)} {...props} />
  )
}
```

- [ ] **Step 3: Update badge component with enhanced variants**

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import './badge.css' // Import enhanced badge styles

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        organic: 'bg-primary/20 text-primary border border-primary/30',
        outline: 'border border-input',
        soft: 'bg-primary/10 text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

export interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {}

export default function Badge(
  { className, variant, ...props }: 
  React.PropsWithRef<BadgeVariantProps>
) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
```

- [ ] **Step 4: Commit enhanced surface components**

```bash
git add components/ui/card.tsx components/ui/badge.tsx components/ui/surface.css
git commit -m "feat: implement enhanced card and surface components with nature-inspired elevation"
```

### Task 6: Navigation and Layout Components

**Files:**
- Modify: `components/app-header.tsx:1-45`
- Modify: `components/bottom-nav.tsx:1-68`
- Create: `components/layout/header.css:1-40`
- Create: `components/layout/nav.css:1-40`

- [ ] **Step 1: Enhance app header with nature elements**

```typescript
// App Header Enhancement
import Link from 'next/link'
import { Bell, Coins, Leaf } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from './auth-provider'
import './header.css' // Import enhanced styles

export function AppHeader() {
  const { user, profile } = useAuth()
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Calculate header opacity based on scroll
  const headerOpacity = scrollY > 50 ? '0.95' : '0.85'
  const headerTransform = scrollY > 10 ? 'translateY(-10px)' : 'translateY(0)'
  
  return (
    <header 
      className={`sticky top-0 z-40 bg-background/${headerOpacity} backdrop-blur-lg 
                  border-b border-border transform-gpu 
                  ${scrollY > 10 ? 'shadow-sm' : ''}
                  transition-all duration-300`
      style={{ transform: headerTransform }}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300">
            {/* Animated leaf icon */}
            <Leaf className="w-4 h-4 text-primary" 
                  style={{ 
                    transform: `rotate(${Math.sin(Date.now() * 0.002) * 5}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }} />
          </div>
          <span className="font-semibold text-lg hidden sm:block">
            Good Deeds
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user && profile && (
            <>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full transition-all duration-200 hover:bg-primary/15">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {profile.total_tokens.toLocaleString()}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {/* Notification dot with pulse */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </Button>
            </>
          )}
          {!user && (
            <Button asChild size="sm">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create header styles**

```css
/* Header Styles */
.app-header {
  @apply sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border;
}

.app-header.scrolled {
  @apply bg-background/90 backdrop-blur-md shadow-sm;
}

.app-header-logo {
  @apply flex items-center gap-2;
}

.app-header-logo-icon {
  @apply w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center;
}

.app-header-logo-icon leaf {
  @apply transition-transform duration-300;
}

.app-header-nav {
  @apply flex items-center gap-3;
}

.app-header-nav-user {
  @apply flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full 
         hover:bg-primary/15 transition-background;
}

.app-header-nav-button {
  @apply relative;
}

.app-header-nav-button .notification-dot {
  @apply absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse;
}
```

- [ ] **Step 3: Enhance bottom navigation with nature interactions**

```typescript
// Bottom Navigation Enhancement
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, ListTodo, Trophy, User, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from './auth-provider'
import './nav.css' // Import enhanced styles

const navItems = [
  { href: '/map', icon: Map, label: 'Map' },
  { href: '/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/submit', icon: Plus, label: 'Submit', featured: true },
  { href: '/leaderboard', icon: Trophy, label: 'Leaders' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(true)
  
  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > lastScrollY + 10 && isVisible) {
        setIsVisible(false)
      } else if (scrollY < lastScrollY - 10 && !isVisible) {
        setIsVisible(true)
      }
      lastScrollY = scrollY
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])
  
  return (
    <nav 
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        'transition-transform duration-300'
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          
          // If not logged in, redirect profile to login
          const href = !user && item.href === '/profile' ? '/auth/login' : item.href
          
          if (item.featured) {
            return (
              <Link
                key={item.href}
                href={user ? href : '/auth/login'}
                className="flex flex-col items-center justify-center -mt-4"
              >
                {/* Enhanced featured button with nature effects */}
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center 
                           shadow-lg shadow-primary/30 transition-all duration-300 
                           hover:scale-105 active:scale-95
                           pulse-soft">
                  <Icon className="w-6 h-6 text-primary-foreground" 
                        style={{ 
                          filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))` 
                        }} />
                </div>
                <span className="text-[10px] mt-1 text-muted-foreground">
                  {item.label}
                </span>
              </Link>
            )
          }
          
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon 
                className={cn(
                  'w-5 h-5',
                  isActive && 'text-primary/80',
                  !isActive && 'text-muted-foreground/60 hover:text-muted-foreground'
                )}
              />
              <span className="text-[10px] mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Create navigation styles**

```css
/* Navigation Styles */
.bottom-nav {
  @apply fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom;
}

.nav-item {
  @apply flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors;
}

.nav-item.active {
  @apply bg-primary/10 text-primary;
}

.nav-item.inactive {
  @apply text-muted-foreground hover:text-foreground hover:bg-muted/50;
}

.nav-featured {
  @apply flex flex-col items-center justify-center -mt-4;
}

.nav-featured-button {
  @apply w-14 h-14 rounded-full bg-primary flex items-center justify-center 
         shadow-lg shadow-primary/30 transition-all duration-300;
}

.nav-featured-button:hover {
  @apply scale-105;
}

.nav-featured-button:active {
  @apply scale-95;
}

.nav-featured-icon {
  @apply w-6 h-6 text-primary-foreground;
}

.nav-featured-label {
  @apply text-[10px] mt-1 text-muted-foreground;
}

/* Pulse animation for featured button */
.pulse-soft {
  position: relative;
}

.pulse-soft::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  animation: pulseSoft 3s infinite;
}

@keyframes pulseSoft {
  0% { transform: scale(0.9); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
  100% { transform: scale(0.9); opacity: 0.3; }
}
```

- [ ] **Step 5: Commit enhanced navigation components**

```bash
git add components/app-header.tsx components/bottom-nav.tsx components/layout/header.css components/layout/nav.css
git commit -m "feat: implement enhanced navigation components with nature-inspired interactions"
```

### Task 7: Design System Documentation and Guidelines

**Files:**
- Create: `docs/design-system/README.md:1-50`
- Create: `docs/design-system/colors.md:1-30`
- Create: `docs/design-system/typography.md:1-30`
- Create: `docs/design-system/components.md:1-40`
- Create: `docs/design-system/animation.md:1-25`
- Modify: `docs/design-system/index.md:1-20` (if exists)

- [ ] **Step 1: Create design system overview documentation**

```markdown
# Impactlly Design System

## Overview
The Impactlly Design System is a nature-inspired visual language that reflects our mission of enabling real-world environmental impact through technology. It combines organic forms, earth-inspired colors, and thoughtful interactions to create an engaging and meaningful user experience.

## Core Principles
1. **Nature-Inspired**: Drawing inspiration from natural forms, colors, and processes
2. **Accessible**: Ensuring all users can perceive, understand, and interact with the interface
3. **Performant**: Optimized for smooth performance across devices
4. **Consistent**: Providing predictable interactions and visual language
5. **Meaningful**: Connecting visual elements to our environmental mission

## Design Tokens
- [Color Palette](./colors.md)
- [Typography](./typography.md)
- [Spacing](./spacing.md)
- [Radius](./radius.md)
- [Shadows](./shadows.md)
- [Animation](./animation.md)

## Component Guidelines
- [Buttons](./components.md#buttons)
- [Inputs](./components.md#inputs)
- [Cards](./components.md#cards)
- [Navigation](./components.md#navigation)
- [Feedback](./components.md#feedback)
```

- [ ] **Step 2: Create color system documentation**

```markdown
# Color Palette

## Primary Colors
Inspired by natural elements and environments.

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Earth Green | `#2D5D2C` | `45, 93, 44` | Primary actions, branding, success states |
| Soil Brown | `#8B7355` | `139, 115, 85` | Secondary actions, grounding elements |
| Sky Blue | `#4A90E2` | `74, 144, 226` | Interactive elements, information, water |
| Sun Yellow | `#F5A623` | `245, 166, 35` | Highlights, rewards, attention |
| Leaf Green | `#6B8E23` | `107, 142, 35` | Growth, vegetation, positive feedback |
| Clay Red | `#CD5C5C` | `205, 92, 92` | Errors, warnings, important notices |

## Nature-Inspired Neutrals
| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Stone White | `#F8F6F3` | `248, 246, 243` | Backgrounds, surfaces, paper |
| Sand Beige | `#F5F0E6` | `245, 240, 230` | Alternative backgrounds, warm neutrals |
| Slate Gray | `#6B7280` | `107, 114, 128` | Primary text, body content |
| Charcoal | `#2F2F2F` | `47, 47, 47` | Dark text, accents, contrast |

## Semantic Mappings
These map design tokens to functional usage while maintaining accessibility.

| Token | Light Theme | Dark Theme | Usage |
|-------|-------------|------------|-------|
| `--background` | `#F8F6F3` | `#2F2F2F` | Page and app backgrounds |
| `--foreground` | `#2F2F2F` | `#F8F6F3` | Primary text content |
| `--primary` | `#2D5D2C` | `#4A7C47` | Primary actions and branding |
| `--secondary` | `#8B7355` | `#A58F6B` | Secondary actions and accents |
| `--accent` | `#4A90E2` | `#6BAED6` | Interactive elements and information |
```

- [ ] **Step 3: Create typography documentation**

```markdown
# Typography

## Typeface Choices
Selected for readability, character, and connection to natural forms.

### Headings: Cormorant Garamond
An elegant serif with organic proportions that conveys trust, sophistication, and timelessness.
- Perfect for titles, section headers, and important announcements
- Available in light, regular, medium, bold, and black weights
- Features organic contrast and natural stroke variations

### Body: Inter
A highly readable sans-serif designed for digital interfaces.
- Optimized for legibility at small sizes
- Features consistent spacing and clear letterforms
- Available in thin to black weights with italic variants

### Monospace: Geist Mono
For code, technical data, and aligned information.
- Clear distinction between similar characters
- Excellent readability in dense technical content

## Typographic Scale
Fluid scale that adapts to viewport size while maintaining hierarchy.

| Size | CSS Variable | Base Value | Fluid Range | Usage |
|------|--------------|------------|-------------|-------|
| 0 | `--font-size-0` | 0.65rem | 0.65rem - 0.85rem | Helper text, labels |
| 1 | `--font-size-1` | 0.75rem | 0.75rem - 0.95rem | Small text, form hints |
| 2 | `--font-size-2` | 0.875rem | 0.875rem - 1.1rem | Base body text |
| 3 | `--font-size-3` | 1.00rem | 1.00rem - 1.25rem | Standard text, form labels |
| 4 | `--font-size-4` | 1.125rem | 1.125rem - 1.40rem | Large text, subheadings |
| 5 | `--font-size-5` | 1.25rem | 1.25rem - 1.60rem | Section headings |
| 6 | `--font-size-6` | 1.50rem | 1.50rem - 1.90rem | Page headings |
| 7 | `--font-size-7` | 1.75rem | 1.75rem - 2.20rem | Section titles |
| 8 | `--font-size-8` | 2.00rem | 2.00rem - 2.50rem | Major headings |
| 9 | `--font-size-9` | 2.25rem | 2.25rem - 2.80rem | Page titles |
| 10 | `--font-size-10` | 2.50rem | 2.50rem - 3.20rem | Hero headings |

## Usage Guidelines
- Headings should use the serif font for personality and hierarchy
- Body text should use the sans-serif for readability
- Limit typefaces to maximum 2 per view (serif + sans-serif)
- Use weight variations within families for emphasis rather than changing families
```

- [ ] **Step 4: Create component usage guidelines**

```markdown
# Component Guidelines

## Buttons
### Variants
- **Default**: Primary actions with earth green background
- **Organic**: Subtle background with hover revelation
- **Pulse**: Continuous gentle animation for featured actions
- **Float**: Elevated buttons with lift on hover
- **Outline**: Border-only for secondary actions
- **Ghost**: Minimal for tertiary actions
- **Link**: Text-only for contextual navigation

### Sizes
- **xs**: Compact actions in tight spaces
- **sm**: Standard compact actions
- **md**: Default button size
- **lg**: Prominent primary actions
- **icon**: Icon-only buttons for toolbars

### States
- All buttons feature hover, active, focus, and disabled states
- Loading states replace text with spinner or progress indicator
- Nature-inspired feedback includes subtle scale and shadow changes

## Inputs and Forms
### Base Styles
- Organic background with subtle backdrop blur
- Focus states feature earth green ring and border enhancement
- Error states use clay red with appropriate contrast
- Success states use leaf green with appropriate contrast

### Special Variants
- **Organic**: Subtle nature-inspired base with enhanced hover
- **Fieldset**: Grouped related fields with organic legend styling
- **Message**: Inline validation with nature-colored backgrounds

## Cards and Surfaces
### Base Card
- Elevated surface with subtle shadow and backdrop blur
- Hover state increases elevation for tactile feedback
- Interactive cards feature scale feedback on press

### Variants
- **Organic**: Primary color base with subtle transparency
- **Nature**: Green-tinted for environmental content
- **Elevated**: Increased shadow for prominence
- **Interactive**: Scale and hover feedback for tappable items

### Surfaces
- **Pane**: Basic elevated container
- **Elevated**: More prominent with increased shadow
- **Glass**: Transparent with backdrop blur for overlays
- **Transparent**: For when you need just the shape without background
```

- [ ] **Step 5: Create animation and motion guidelines**

```markdown
# Animation and Motion

## Principles
Animations should feel natural, purposeful, and connected to our environmental mission.

### Natural Easing
Inspired by natural movements:
- `--ease-organic`: Slow start, quick middle, gentle end (like a leaf falling)
- `--ease-nature`: Quick start, gradual end (like water flowing)
- `--ease-pulse`: Gentle expansion and contraction (like breathing)

### Duration Guidelines
- **Fast** (150ms): State changes, toggles, small interactions
- **Normal** (250ms): Page transitions, modal openings, moderate changes
- **Slow** (350ms): Major layout changes, complex animations, entrance/exit

### Specific Animation Types

#### Micro-interactions
- Button presses: Scale down 5% then return
- Hover states: Gentle lift 2-4px with shadow enhancement
- Focus rings: Expand from center with soft glow
- Toggles: Slide with slight overshoot and settle

#### Page Transitions
- Fade-through: Current fades out while new fades in
- Slide-overlay: New slides over current from direction of navigation
- Scale-fade: Element scales slightly while fading in/out
- Morph: Shape transforms naturally between states

#### Nature-Inspired Effects
- **Pulse**: Gentle expansion/contraction like breathing or heartbeat
- **Float**: Slow rise and fall like leaves on water
- **Sway**: Gentle side-to-side like plants in breeze
- **Ripple**: Circular expansion from point of interaction
- **Grow**: Natural expansion from center outward

## Performance Considerations
- All animations respect `prefers-reduced-motion`
- Use `transform` and `opacity` for GPU-accelerated animations
- Limit concurrent animations to maintain 60fps
- Use `will-change` judiciously for known animated elements
- Consider CSS animations for simple cases, JS for complex orchestration

## Implementation Guidelines
### CSS Animations
```css
/* Organic pulse */
@keywordframes pulse {
  0% { transform: scale(0.95); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 0.6; }
}

.element {
  animation: pulse 3s ease-in-out infinite;
}
```

### Framer Motion (React)
```tsx
import { motion } from 'framer-motion'

// Organic pulse
<motion.div 
  whileTap={{ scale: 0.95 }}
  whileHover{{ scale: 1.02 }}
  animate={{ 
    scale: [0.98, 1.02, 0.98], 
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
  }}
/>

// Page transition
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>
```
```

- [ ] **Step 6: Commit design system documentation**

```bash
git add docs/design-system/README.md docs/design-system/colors.md docs/design-system/typography.md docs/design-system/components.md docs/design-system/animation.md docs/design-system/index.md
git commit -m "feat: create comprehensive design system documentation and guidelines"
```

### Task 8: Integration and Testing

**Files:**
- Modify: `package.json:1-30` (add dependencies if needed)
- Create: `tests/ui/design-system.test.tsx:1-50`
- Modify: Various component test files to use new design system

- [ ] **Step 1: Add required dependencies**

```json
{
  "dependencies": {
    // ... existing dependencies ...
    "framer-motion": "^11.0.0",
    "class-variance-authority": "^0.7.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    // ... existing devDependencies ...
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 3: Create design system test**

```typescript
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
      .toHaveClas('border')
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
```

- [ ] **Step 4: Run design system tests**

```bash
pnpm test tests/ui/design-system.test.tsx
```

- [ ] **Step 5: Commit integration and tests**

```bash
git add package.json pnpm-lock.yaml tests/ui/design-system.test.tsx
git commit -m "feat: integrate design system enhancements and add comprehensive tests"
```

### Task 9: Final Review and Polishing

**Files:**
- Review: All modified files from previous tasks
- Create: `docs/superpowers/specs/2026-04-14-visual-design-system-enhancement-design.md` (already exists)
- Update: `README.md` with design system mentions if appropriate

- [ ] **Step 1: Perform visual regression check**

```bash
# Manually verify key screens
# - Home page
# - Map page
# - Submit flow
# - Profile page
# - Badges page
# Check for:
# - Consistent color usage
# - Proper typography hierarchy
# - Enhanced component states
# - Nature-inspired interactions
# - Accessibility compliance
```

- [ ] **Step 2: Test animations with reduced motion preference**

```bash
# Test with prefers-reduced-motion: reduce
# Ensure animations are substituted appropriately
# Verify no loss of functionality
```

- [ ] **Step 3: Verify accessibility compliance**

```bash
# Run accessibility tests
# Check color contrast ratios
# Verify keyboard navigation
# Test screen reader compatibility
# Ensure touch targets meet minimum sizes
```

- [ ] **Step 4: Update main README with design system highlights**

```markdown
## 🎨 Enhanced Design System

Impactlly now features a nature-inspired design system that connects the digital experience to our environmental mission:

- **Earth-inspired color palette** with greens, browns, blues, and yellows
- **Organic typography** pairing serif headings with readable sans-serif body
- **Nature-infused components** with subtle animations and feedback
- **Accessible design** meeting WCAG 2.1 AA standards
- **Performance-conscious** implementation optimized for all devices
```

- [ ] **Step 5: Commit final review**

```bash
git add .
git commit -m "feat: complete visual design system enhancement with final review and polishing"
```

## Dependencies
- framer-motion: ^11.0.0
- class-variance-authority: ^0.7.0
- tailwind-merge: ^2.2.0

## Files Modified
- styles/globals.css
- styles/theme-variables.css
- styles/typography.css
- app/globals.css
- components/ui/button.tsx
- components/ui/button.css
- components/ui/input.tsx
- components/ui/textarea.tsx
- components/ui/select.tsx
- components/ui/form-field.css
- components/ui/card.tsx
- components/ui/badge.tsx
- components/ui/surface.css
- components/app-header.tsx
- components/bottom-nav.tsx
- components/layout/header.css
- components/layout/nav.css
- docs/design-system/*.md
- tests/ui/design-system.test.tsx
- package.json
- pnpm-lock.yaml
- README.md (optional)