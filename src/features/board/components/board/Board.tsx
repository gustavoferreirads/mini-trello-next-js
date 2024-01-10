import { BoardHead } from './Header'
import AddColumn from '../column/AddColumn'
import Column from '../column/Column'
import { useContext } from 'react'
import { BoardContext } from '../../context/BoardDataProvider'
import DetailCardModal from '../card/DetailCardModal'

export default function BoardContainer() {
  const { board } = useContext(BoardContext)
  if (!board) {
    return null
  }

  return (
    <div className="overflow-hidden top-0 left-0 right-0 bottom-0">
      <div
        className="h-full w-full  bg-gradient-to-b"
        style={{ backgroundColor: board.color || '#0079bf' }}
      >
        <BoardHead board={board} />

        <div className="w-full h-[90vh] overflow-x-auto flex justify-start items-start p-2">
          {board.columns.map((column, index) => (
            <Column key={`${column.id}-${index}`} data={column} />
          ))}

          <AddColumn
            isFirstColumn={!board.columns.length}
            boardId={board.id}
            pos={board.columns.length}
          />
        </div>
      </div>
      <DetailCardModal />
    </div>
  )
}
