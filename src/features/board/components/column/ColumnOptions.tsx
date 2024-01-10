import { FC, useState } from 'react'
import { IColumn } from '../../types/column'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Popover } from 'react-tiny-popover'
import { FaRegTrashAlt, FaSortAlphaDown } from 'react-icons/fa'
import { BiSortUp } from 'react-icons/bi'
import { SORT_KEYS, useColumn } from '../../hooks/useColumn'
import ConfirmModal from '@/common/ConfirmModal'

interface CardProps {
  column: IColumn
}

export const ColumnOptions: FC<CardProps> = ({ column }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { sort, remove } = useColumn()

  const openConfirmDialog = () => {
    setIsModalOpen(true)
    setIsPopoverOpen(false)
  }

  const classNameItem =
    'hover:bg-slate-200 px-3 py-2 text-sm cursor-pointer items-center flex gap-2 w-full'

  return (
    <div>
      <Popover
        isOpen={isPopoverOpen}
        positions="right"
        align="start"
        padding={0}
        reposition={false}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={() => (
          <div className="bg-white shadow rounded pt-4 w-48">
            <p className="text-center text-sm font-semibold pb-2">
              List actions
            </p>

            <button
              className={classNameItem}
              onClick={() => openConfirmDialog()}
            >
              <FaRegTrashAlt /> Delete
            </button>

            <button
              className={classNameItem}
              onClick={() => sort(column.id, SORT_KEYS.title)}
            >
              <FaSortAlphaDown /> Name
            </button>

            <button
              className={classNameItem}
              onClick={() => sort(column.id, SORT_KEYS.createdAt)}
            >
              <BiSortUp /> Created by
            </button>
          </div>
        )}
      >
        <div
          className="cursor-pointer"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <MoreVertIcon fontSize="small" className="text-gray-500" />
        </div>
      </Popover>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={async () => {
          await remove(column.id)
          setIsModalOpen(false)
        }}
        title="Delete action"
        message={`Are you sure you want to delete ${column.title} column?`}
      />
    </div>
  )
}
