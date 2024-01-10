import React from 'react'
import clsx from 'clsx'

export interface InputProps {
  id?: string
  name?: string
  type: string
  placeholder: string
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  rows?: number
  value: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
  ) => void
  onBlur?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
  ) => void
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  autoFocus = true,
  disabled,
  className,
  onChange,
  onBlur,
}) => {
  const inputClasses = clsx(
    ' shadow-sm  appearance-none border border-zinc-200 w-full my-2 p-1 rounded-md text-gray-600   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline font-normal',
    className,
  )

  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      autoFocus={autoFocus}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={inputClasses}
    />
  )
}
