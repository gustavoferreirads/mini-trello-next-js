import React from 'react'

export interface TypographyProps {
  children: React.ReactNode
  className?: string
  variant: 'h1' | 'p' | 'title'
}

export const Typography = ({
  variant,
  children,
  className,
}: TypographyProps) => {
  const variants = {
    h1: 'text-2xl font-bold',
    p: 'text-sm font-normal',
    title: 'text-lg font-semibold',
  }

  const Component = variant.startsWith('h') ? 'h' + variant[1] : 'p'

  return (
    <Component
      className={
        className
          ? className + ' ' + variants[variant]
          : `text-slate-900 leading-tight ${variants[variant]}`
      }
    >
      {children}
    </Component>
  )
}
