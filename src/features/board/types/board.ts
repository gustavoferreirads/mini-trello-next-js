import { IColumn } from '@/features/board/types/column'

export interface Board {
  id: string
  title: string
  color: string
  columns: IColumn[]
}
