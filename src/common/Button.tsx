import React from 'react'
import { Typography } from './Typography'
import clsx from 'clsx'
import Loading from "@/common/Loading";

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  loading,
  onClick,
  type = 'button',
  className,
  variant = 'primary', // Default to primary if not specified
}) => {
  const customClasses = clsx(
    'flex justify-center items-center gap-2.5 inline-flex text-white font-normal py-1 px-2 rounded cursor-pointer disabled:opacity-50',
    {
      'bg-blue-600 hover:bg-blue-700': variant === 'primary',
      'bg-gray-600 hover:bg-gray-700': variant === 'secondary', // Styles for secondary variant
    },
    className,
  )

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={customClasses}
    >

      <Loading visible={loading} size="1em" />
      <Typography variant="p" className="font-semibold">
        {children}
      </Typography>
    </button>
  )
}
