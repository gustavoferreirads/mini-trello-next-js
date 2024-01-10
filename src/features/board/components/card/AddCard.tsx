'use client'
import { FormEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { useCard } from '../../hooks/useCard'
import { TextArea } from '@/common/TextArea'
import { Button } from '@/common/Button'

type NewCardFormProps = {
  rows?: number
  boardId: string
  columnId: string
  pos: number
}

export default function NewCardForm({
  rows,
  boardId,
  columnId,
  pos,
}: NewCardFormProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const onCancel = () => {
    setIsAdding(false)
    setTitle('')
  }

  const { save, error, loading } = useCard()

  const [title, setTitle] = useState<string>('')

  async function handleCreate(event: FormEvent) {
    event.preventDefault()

    await save({ title, boardId, columnId, pos })
    if (!title) return

    setTitle('')
  }

  if (!isAdding) {
    return (
      <button
        className="w-full bg-transparent hover:bg-slate-200 rounded-md text-gray-500 flex text-sm p-2 font-semibold "
        onClick={() => setIsAdding(true)}
      >
        <AddIcon fontSize="small" className="mr-2" />
        Add a card
      </button>
    )
  }

  return (
    <form onSubmit={handleCreate}>
      <TextArea
        rows={rows || 3}
        disabled={loading}
        placeholder="Enter a title for this card..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button type="submit" className="w-20 mr-3">
        Add card
      </Button>

      <CloseIcon
        fontSize="medium"
        className="cursor-pointer"
        onClick={onCancel}
      />
    </form>
  )
}
