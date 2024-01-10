import { Typography } from '@/common/Typography'
import Boards from '@/features/board/components/board/Boards'

export default function Home() {
  return (
    <main className=" flex-col items-center h-full px-32 py-24 ">
      <Typography variant="title">My Workspace</Typography>

      <Boards />
    </main>
  )
}
