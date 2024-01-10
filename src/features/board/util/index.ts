import { ICard } from '../types/card'
import { IColumn } from '../types/column'

export const moveCardPosition = (
  columns: IColumn[],
  card: ICard,
  toCard: ICard,
): IColumn[] => {
  const { id: cardId, columnId } = card
  const { id: toCardId, columnId: toColumnId } = toCard

  const fromList = columns.findIndex((column) => column.id == columnId)
  const toList = columns.findIndex((column) => column.id == toColumnId)

  const from = columns[fromList].cards.findIndex((card) => card.id == cardId)
  const to = columns[toList].cards.findIndex((card) => card.id == toCardId)

  const draggedCard = columns[fromList].cards[from]
  draggedCard.columnId = columns[toList].id

  columns[fromList].cards.splice(from, 1)

  if (!to) {
    columns[toList].cards.push(draggedCard)
    return columns
  }

  columns[toList].cards.splice(to, 0, draggedCard)

  columns[fromList].cards = columns[fromList].cards.filter((e) => !!e)

  columns[fromList].cards = columns[fromList].cards.map((a, index) => ({
    ...a,
    pos: index,
  }))

  if (fromList != toList) {
    columns[toList].cards = columns[toList].cards.filter((e) => !!e)
    columns[toList].cards = columns[toList].cards.map((a, index) => ({
      ...a,
      pos: index,
    }))
  }
  return columns
}

export const moveColumnPosition = (
  columns: IColumn[],
  column: IColumn,
  toColumn: IColumn,
): IColumn[] => {
  const fromList = columns.findIndex((c) => c.id == column.id)
  const toList = columns.findIndex((c) => c.id == toColumn.id)

  const dragged = { ...columns.splice(fromList, 1)[0] }
  columns.splice(toList, 0, dragged)

  columns.forEach((c, index) => {
    c.pos = index
  })

  return columns
}

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number,
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function (...args: Parameters<F>): void {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}
