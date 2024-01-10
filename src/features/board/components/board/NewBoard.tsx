'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useCreateBoard } from '../../hooks/useBoard'
import { Popover } from 'react-tiny-popover'
import { Board } from '../../types/board'
import ColorGrid from '@/common/ColorGrid'
import { Typography } from '@/common/Typography'
import { Input } from '@/common/Input'
import { Button } from '@/common/Button'

interface NewBoardProps {
  children: React.ReactElement
  align?: 'start' | 'center' | 'end'
}

const NewBoard: React.FC<NewBoardProps> = ({ children, align }) => {
  const [board, setBoard] = useState<Board>({} as Board)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  const { create, error, loading } = useCreateBoard()

  const router = useRouter()

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault()
    const data = await create(board)
    setIsPopoverOpen(false)
    router.push('board/' + data?.id)
  }

  return (
    <div onClick={() => setIsPopoverOpen(true)}>
      <Popover
        isOpen={isPopoverOpen}
        positions="right"
        align={align || 'center'}
        padding={8}
        reposition={false}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={() => (
          <form onSubmit={handleCreate}>
            <div className="bg-white shadow-lg rounded-md pt-4 w-56 border-2 border-gray-100 p-4">
              <Typography
                variant="p"
                className="text-center font-semibold pb-4"
              >
                Create board
              </Typography>

              <Typography variant="p" className=" font-normal">
                Background
              </Typography>

              <ColorGrid
                className="mt-2 mb-4"
                onSelect={(color) => setBoard((prev) => ({ ...prev, color }))}
              />

              <Typography variant="p">Board title</Typography>

              <Input
                placeholder=""
                type="text"
                name="title"
                id="title"
                value={board.title}
                onChange={(e) =>
                  setBoard((prev) => ({ ...prev, title: e.target.value }))
                }
              />

              <Button
                type="submit"
                disabled={!board.title}
                className="w-full mt-2"
              >
                Create
              </Button>
            </div>
          </form>
        )}
      >
        <div>{children}</div>
      </Popover>
    </div>
  )
}

export default NewBoard
