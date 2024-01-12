import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '@/common/Modal'
import { Button } from '@/common/Button'
import { FiX, FiCreditCard } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'

import ConfirmModal from '@/common/ConfirmModal'

import { CardContext } from '../../context/CardDetailsProvider'
import EditableInput from '@/common/EditableLabel'
import { Typography } from '@/common/Typography'
import { useCard } from '../../hooks/useCard'

const DetailCardModal: React.FC = () => {
  const { save, remove, error, loading } = useCard()
  const { card, setCard } = useContext(CardContext)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const handleSave = async () => {
    await save(card)
    setCard(null)
  }

  const handleDelete = async () => {
    if (card?.id) await remove(card?.id)
    setCard(null)
    setIsConfirmModalOpen(false)
  }

  if (!card) return null

  return (
    <>
      <Modal isOpen={Boolean(card)} onClose={() => setCard(null)}>
        <div className="p-6 min-w-96 flex gap-6">
          <div className="min-w-96">
            <div className="flex items-center gap-3 mb-6">
              <FiCreditCard size="1em" />
              <EditableInput
                label={card.title}
                onSubmit={(title) => setCard({ ...card, title })}
                className="text-lg font-semibold  text-gray-600"
              >
                {card.title}
              </EditableInput>
            </div>

            <EditableInput
              type="textarea"
              label={card.description}
              onSubmit={(description) => setCard({ ...card, description })}
            >
              <div className="min-h-20 my-4 bg-slate-200  hover:bg-slate-300  pl-6 pt-4 rounded-md cursor-pointer">
                <Typography
                  variant="p"
                  className="font-semibold text-sm text-gray-600 "
                >
                  {card.description || 'Add a more detailed description… '}
                </Typography>
              </div>
            </EditableInput>

            <Button disabled={loading} className="mt-4" onClick={handleSave}>
              Save
            </Button>
          </div>

          <div>
            <div className="flex justify-end  min-w-40">
              <button
                className="rounded-full hover:bg-slate-200 p-1"
                onClick={() => setCard(null)}
              >
                <FiX size="1.4em" className="text-gray-600" />
              </button>
            </div>

            <Typography variant="p" className=" text-sm text-gray-600 mb-2 ">
              Actions
            </Typography>

            <div
              className="w-full bg-slate-200 hover:bg-slate-300 cursor-pointer flex gap-2 p-2"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              <FaRegTrashAlt clasName="text-gray-600" />
              <Typography
                variant="p"
                className="font-semibold text-sm text-gray-600 "
              >
                Delete
              </Typography>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setCard(null)
          setIsConfirmModalOpen(false)
        }}
        loading={loading}
        onConfirm={handleDelete}
        title="Delete Card"
        message="Are you sure you want to delete this card?"
      />
    </>
  )
}

export default DetailCardModal
