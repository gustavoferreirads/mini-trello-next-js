import { useQuery } from '@apollo/client'
import { GET_BOARDS } from '../../apollo/queries/board'
import { Board } from '../../types/board'
import Link from 'next/link'

export default function BoardItems() {
  const { data, loading } = useQuery<{ boards: Board[] }>(GET_BOARDS)

  return (
    <>
      {data?.boards.map((board) => (
        <Link
          key={board.id}
          href={`/board/${board.id}`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {board.title}
        </Link>
      ))}
    </>
  )
}
