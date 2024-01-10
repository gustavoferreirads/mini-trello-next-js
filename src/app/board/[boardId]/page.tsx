'use client'
import BoardContainer from '@/features/board/components/board/Board'
import { BoardProvider } from '@/features/board/context/BoardDataProvider'
import { CardProvider } from '@/features/board/context/CardDetailsProvider'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardPage = ({ params }: BoardIdPageProps) => {
  return (
    <BoardProvider boardId={params.boardId}>
       <CardProvider>
           < BoardContainer />
      </CardProvider>
    </BoardProvider>
  )
}

export default BoardPage
