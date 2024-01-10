'use client'
import { FormEvent, useState } from 'react'
import clsx from 'clsx'
import { Input } from './Input'
import { TextArea } from './TextArea'

interface EditableInputProps {
  submitAction?: React.ReactNode
  cancelAction?: React.ReactNode
  children?: React.ReactNode
  onSubmit: (text: string) => void
  className?: string
  label: string
  type?: string
}

export default function EditableInput({
  submitAction,
  cancelAction,
  className,
  onSubmit,
  label,
  children,
  type,
}: EditableInputProps) {
  const [value, setValue] = useState<string>(label)
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const onCancel = () => {
    setIsAdding(false)
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    if (!value) return
    onSubmit(value)
    onCancel()
  }

  const onBlur = () => {
    setIsAdding(false)
    onSubmit(value)
  }
  if (!isAdding) {
    return (
      <p className={className} onClick={() => setIsAdding(true)}>
        {children}
      </p>
    )
  }

  const customClasses = clsx('font-medium w-full p-1', className)

  return (
    <form onSubmit={handleCreate} className="flex">
      {type === 'textarea' ? (
        <TextArea
          value={value}
          placeholder={value}
          onBlur={onBlur}
          className={customClasses}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <Input
          type={type || 'text'}
          value={value}
          placeholder={value}
          onBlur={onBlur}
          className={customClasses}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      {submitAction || <button type="submit" className="opacity-100" />}

      {cancelAction}
    </form>
  )
}
