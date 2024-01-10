'use client'
import { useQuery } from '@apollo/client'
import { GET_BOARDS } from '@/features/board/apollo/queries/board'
import { Typography } from '@/common/Typography'
import { AiOutlineUser } from 'react-icons/ai'
import { Board } from '../../types/board'
import Loading from '@/common/Loading'
import NewBoard from './NewBoard'
import Link from 'next/link'

export default function Boards() {
  const { data, loading } = useQuery<{ boards: Board[] }>(GET_BOARDS)
  const cardClass = 'rounded-lg w-48 h-28 hover:opacity-70 p-4  cursor-pointer'
  return (
    <div className="w-full py-10 px-4 rounded-md border-t-2 mt-2	border-gray-100">
      <div className=" flex my-2 gap-2">
        <AiOutlineUser />
        <Typography variant="title">Your boards</Typography>

        <Loading visible={loading} />
      </div>

      <div className="flex mt-4 gap-4 flex-wrap">
        {!loading &&
          data?.boards.map((board, index) => (
            <Link key={index} href={`/board/${board.id}`}>
              <div
                key={board.id}
                className={`${cardClass} shadow-xl bg-slate-700 cursor-pointer`}
                style={{ backgroundColor: board.color }}
              >
                <Typography variant="title" className="text-white">
                  {board.title}
                </Typography>
              </div>
            </Link>
          ))}

        <NewBoard>
          <div
            className={`${cardClass} flex items-center justify-center bg-slate-200 `}
          >
            <Typography variant="p" className="text-gray-600">
              Create new board
            </Typography>
          </div>
        </NewBoard>
      </div>
    </div>
  )
}
