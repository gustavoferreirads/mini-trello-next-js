import React from 'react'
import { Button } from './Button'
import { Typography } from './Typography'
import { FaRegTrashAlt } from 'react-icons/fa'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null
  /*className="text-lg leading-6 font-medium text-gray-900"*/
  return (
    <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start">
      <div className="relative mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white mt-32 text-center max-w-80 ">
        <Typography variant="title">{title}</Typography>

        <div className="mt-2 px-7 py-4 ">
          <Typography variant="p">{message}</Typography>
        </div>

        <div className="items-center px-4 py-3 flex justify-center">
          <Button className="px-4 py-2" onClick={onConfirm}>
            Confirm
          </Button>
          <Button
            variant="secondary"
            className="px-4 py-2 ml-3 "
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
