import clsx from 'clsx'
import AddCard from '../card/AddCard'
import { IColumn } from '../../types/column'
import { Card } from '../card/Card'
import { ItemTypes } from '../../types/item'
import { useDrag, useDrop } from 'react-dnd'
import { useContext } from 'react'
import { BoardContext } from '../../context/BoardDataProvider'
import { ICard } from '../../types/card'
import EditableInput from '@/common/EditableLabel'
import { ColumnOptions } from './ColumnOptions'
import { useColumn } from '../../hooks/useColumn'

interface ColumnProps {
  data: IColumn
}

const Column: React.FC<ColumnProps> = ({ data }) => {
  const { moveColumn } = useContext(BoardContext)
  const { save } = useColumn()

  const { cards } = data
  const emptyCard = { columnId: data.id } as ICard

  const onSave = (title: string) => {
    save({ ...data, title })
  }

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.COLUMN,
      item: () => ({ ...data }),
      end: (item, monitor) => {
        if (item.id === data.id) return
        /*  const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveColumn(item, data)
          item.pos = data.pos
        }*/
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [data],
  )

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.COLUMN,
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
      }),

      hover(item: IColumn) {
        if (item.id === data.id) return

        moveColumn(item, data)
        item.pos = data.pos
      },
    }),
    [data],
  )

  const isActive = isDragging || isOver

  const bgClass = clsx({
    'bg-gray-300 opacity-50': isActive,
    'bg-gray-100': !isActive,
  })

  const opacityClass = clsx({
    'opacity-0': isActive,
    'opacity-100': !isActive,
  })

  return (
    <div ref={(node: any) => drag(drop(node))} className="h-full">
      <div
        className={clsx(
          'w-[272px] rounded-xl shadow m-2 p-2 space-y-2',
          bgClass,
        )}
      >
        <div className={opacityClass}>
          <div className="p-2 justify-between flex">
            <EditableInput
              label={data.title}
              className="text-gray-500 font-semibold text-sm min-full"
              onSubmit={onSave}
            >
              {data.title}
            </EditableInput>

            <ColumnOptions column={data} />
          </div>
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}

          {cards.length === 0 && (
            <Card card={emptyCard} key={cards.length} isFirst />
          )}

          <AddCard
            boardId={data.boardId}
            columnId={data.id}
            pos={(cards || []).length}
          />
        </div>
      </div>
    </div>
  )
}

export default Column
