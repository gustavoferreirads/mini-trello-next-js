import { useMutation } from '@apollo/client'
import { GET_BOARD_BY_ID } from '../apollo/queries/board'
import { ICard } from '../types/card'
import { SAVE_CARD, DELETE_CARDS, MOVE_CARD } from '../apollo/mutation/card'
import { useCallback } from 'react'
import { debounce } from '../util'

const setConfig = (variables: any, fnName: string) => ({
  variables,
  refetchQueries: ({ data }: any) => [
    {
      query: GET_BOARD_BY_ID,
      variables: { id: data[fnName].boardId },
    },
  ],
})

export const useCard = () => {
  const [deleteCard, { loading, error }] = useMutation(DELETE_CARDS)
  const [moveCard, { loading: moveLoading, error: errorMove }] = useMutation(
    MOVE_CARD,
  )

  const [saveCard, createFeedback] = useMutation(SAVE_CARD, {
    onError: (err) => console.error(err),
  })

  const remove = async (id: string) =>
    await deleteCard(setConfig({ id }, 'deleteCard'))

  const move = useCallback(
    debounce(async (cardId: string, toCardId: string, toColumnId) => {
      await moveCard({ variables: { data: { cardId, toCardId, toColumnId } } })
    }, 350),
    [],
  )

  const save = async (card: any): Promise<ICard | null | undefined> => {
    const { data } = await saveCard(
      setConfig(
        {
          data: {
            id: card.id,
            title: card.title,
            columnId: card.columnId,
            pos: card.pos,
            description: card.description,
            boardId: card.boardId,
          },
        },
        'saveCard',
      ),
    )
    return data?.saveCard
  }

  return {
    remove,
    move,
    save,
    loading: !(!loading && !moveLoading && !createFeedback.loading),
    error: error || errorMove || createFeedback.error,
  }
}
