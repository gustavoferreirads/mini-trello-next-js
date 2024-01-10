import React from 'react'
import clsx from 'clsx'

export interface TextAreaProps {
  id?: string
  name?: string
  placeholder: string
  className?: string
  disabled?: boolean
  rows?: number
  value: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
  ) => void
  onBlur?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
  ) => void
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  placeholder,
  value,
  className,
  onChange,
  disabled,

  rows,
  onBlur,
}) => {
  const inputClasses = clsx(
    ' shadow-sm  appearance-none border border-zinc-200 w-full my-2 p-1 rounded-md text-gray-600   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline font-normal text-sm p-3',
    className,
  )

  return (
    <textarea
      id={id}
      name={name}
      rows={rows || 3}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      autoFocus
      className={inputClasses}
    />
  )
}
