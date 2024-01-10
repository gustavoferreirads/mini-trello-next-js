'use client'
import { FormEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { useCreateColumn } from '../../hooks/useColumn'
import { IColumn } from '../../types/column'
import { Button } from '@/common/Button'
import { Input } from '@/common/Input'

interface AddColumnProps {
  pos: number
  boardId: string
  isFirstColumn: boolean
}

export default function AddColumn({
  boardId,
  pos,
  isFirstColumn,
}: AddColumnProps) {
  const [title, setTitle] = useState<string>('')
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const onClean = () => {
    setIsAdding(false)
  }

  const { create, error, loading } = useCreateColumn()

  async function handleCreate(event: FormEvent) {
    event.preventDefault()
    if (!title) return
    await create({ title, boardId, pos } as IColumn)
    setTitle('')
  }

  if (!isAdding) {
    return (
      <div className="w-[272px]">
        <button
          className="w-[272px] bg-white hover:bg-gray-400 hover:bg-opacity-25  bg-opacity-25 ml-2 rounded-xl text-white flex text-sm font-medium p-3 mt-2"
          onClick={() => setIsAdding(true)}
        >
          <AddIcon fontSize="small" className="mr-2" />
          {isFirstColumn ? 'Add a list' : 'Add another list'}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white p-2 rounded-xl mt-2">
      <form onSubmit={handleCreate} className=" w-[272px]">
        <Input
          type="text"
          value={title}
          disabled={loading}
          autoFocus
          placeholder="Enter list title..."
          className="border-none shadow-none"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button type="submit" disabled={loading} className="w-20  mt-2 mr-3">
          Add list
        </Button>

        <CloseIcon
          fontSize="medium"
          className="cursor-pointer"
          onClick={onClean}
        />
      </form>
    </div>
  )
}
