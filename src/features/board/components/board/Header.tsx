import { Board } from '../../types/board'

interface BoardHeadProps {
  board: Board
}

export const BoardHead = ({ board }: BoardHeadProps) => {
  return (
    <div className="bg-black bg-opacity-10 p-4 flex text-white shadow">
      <span className="text-1xl font-bold ">{board.title}</span>
    </div>
  )
}
