import { FC, useContext } from 'react'
import { XYCoord, useDrag, useDrop } from 'react-dnd'
import { ICard } from '../../types/card'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { ItemTypes } from '../../types/item'
import { BoardContext } from '../../context/BoardDataProvider'
import { CardContext } from '../../context/CardDetailsProvider'
import clsx from 'clsx'

interface CardProps {
  card: ICard
  isFirst?: boolean
}

export const Card: FC<CardProps> = ({ card, isFirst }) => {
  const { setCard } = useContext(CardContext)
  const { moveCard } = useContext(BoardContext)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => ({ ...card }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop && item.id !== card.id) {
          moveCard(item, card)
          item.columnId = card.columnId
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [card],
  )

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        handlerId: monitor.getHandlerId(),
      }),

      hover(item: ICard) {
        if (item.id == card.id) return
        moveCard(item, card)
        item.columnId = card.columnId
      },
    }),
    [card],
  )

  const isActive = isDragging || isOver

  const bgClass = clsx({
    'bg-gray-200': isActive,
    'bg-transparent': isFirst,
    'bg-white': !isActive && !isFirst,
  })

  const opacityClass = clsx({
    'opacity-0': isActive,
    'opacity-100': !isActive,
  })

  const cardClass = clsx({
    'cursor-pointer hover:outline-none hover:ring-2 hover:ring-bl rounded-lg border-gray-300 shadow-sm': !isFirst,
  })

  const ref = (node: any) => (isFirst ? drop(node) : drag(drop(node)))

  return (
    <div ref={ref} className="py-1">
      <div
        className={clsx(cardClass, bgClass)}
        onClick={() => setCard({ ...card })}
      >
        <div
          className={clsx(
            'w-full rounded-lg p-3 text-sm break-al',
            opacityClass,
          )}
        >
          {card.title}
          {!isFirst && (
            <div className="absolute w-64 text-right -mt-8 p-2 -ml-2.5 pr-4 opacity-0 hover:opacity-100">
              <EditOutlinedIcon fontSize="small" className="text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
