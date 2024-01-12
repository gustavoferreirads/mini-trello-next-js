import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { Board } from '../types/board'
import { ICard } from '../types/card'
import { IColumn } from '../types/column'
import { debounce, moveCardPosition, moveColumnPosition } from '../util'
import { useGetBoardById } from '../hooks/useBoard'
import { useColumn } from '../hooks/useColumn'
import { useCard } from '../hooks/useCard'

export type BoardProviderType = {
  board?: Board
  isLoading: boolean
  moveCard: (card: ICard, toCard: ICard) => void
  moveColumn: (column: IColumn, toColumn: IColumn) => void
}

export const BoardContext = createContext<BoardProviderType>({
  moveCard: () => {},
  moveColumn: () => {},
  isLoading: false,
})

type Props = {
  children?: React.ReactNode
  boardId?: string
}

export const BoardProvider: React.FC<Props> = ({ children, boardId }) => {
  const [board, setBoard] = useState<Board | undefined>()

  const { data, loading, error } = useGetBoardById(boardId)

  const { move: moveColumnMutation } = useColumn()
  const { move: moveCardMutation } = useCard()

  useEffect(() => {
    if (data) {
      setBoard({ ...JSON.parse(JSON.stringify(data)) })
    }
  }, [data, loading, error])

  const moveCard = useMemo(
    () =>
      function (card: ICard, toCard: ICard) {
        if (!board) return

        const columns = moveCardPosition([...board.columns], card, toCard)

        moveCardMutation(card.id, toCard.id, toCard.columnId)

        setBoard({ ...board, columns })
      },
    [board],
  )

  const moveColumn = useMemo(
    () => (column: IColumn, toColumn: IColumn) => {
      if (!board) return

      moveColumnMutation(column.id, toColumn.id)
      const columns: IColumn[] = moveColumnPosition(
        [...board.columns],
        column,
        toColumn,
      )

      setBoard({ ...board, columns })
    },
    [board],
  )

  return (
    <BoardContext.Provider
      value={{
        board,
        moveCard,
        moveColumn,
        isLoading: loading,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
