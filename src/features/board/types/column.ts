import { ICard } from '@/features/board/types/card'

export interface IColumn {
  id: string
  title: string
  pos: number
  boardId: string
  color: string
  cards: ICard[]
}