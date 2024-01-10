import { Column } from './../../../../../backend/dtos/model/Column'

import { useMutation } from '@apollo/client'
import {
  DELETE_COLUMN,
  MOVE_COLUMN,
  SAVE_COLUMN,
  SORT_COLUMN_CARDS,
} from '../apollo/mutation/column'
import { GET_BOARD_BY_ID } from '../apollo/queries/board'
import { IColumn } from '../types/column'
import { useCallback } from 'react'
import { debounce } from '../util'

export const SORT_KEYS = {
  title: 'title',
  createdAt: 'created_at',
}

export const useCreateColumn = () => {
  const [saveColumn, { error, loading, data }] = useMutation(SAVE_COLUMN, {
    onError: (err) => console.error(err),
  })

  const create = async (data: IColumn): Promise<any> => {
    const result = await saveColumn({
      variables: {
        data: { ...data },
      },
      refetchQueries: (mutationResult) => {
        console.log(mutationResult)
        return [
          {
            query: GET_BOARD_BY_ID,
            variables: { id: mutationResult.data.saveColumn.boardId },
          },
        ]
      },
    })

    return
  }

  return {
    create,
    loading,
    error,
  }
}

const setConfig = (variables: any, fnName: string) => ({
  variables,
  refetchQueries: ({ data }: any) => [
    {
      query: GET_BOARD_BY_ID,
      variables: { id: data[fnName].boardId },
    },
  ],
})

export const useColumn = () => {
  const [removeColumn, deleteResp] = useMutation(DELETE_COLUMN)
  const [moveColumn, moveResp] = useMutation(MOVE_COLUMN)

  const [sortCards, sortResp] = useMutation(SORT_COLUMN_CARDS)

  const [saveColumn, saveResp] = useMutation(SAVE_COLUMN, {
    onError: (err) => console.error(err),
  })

  const remove = async (id: string) =>
    await removeColumn(setConfig({ id }, 'removeColumn'))

  const move = useCallback(
    debounce(async (columnId: string, toColumnId: string) => {
      await moveColumn({ variables: { data: { columnId, toColumnId } } })
    }, 350),
    [],
  )

  const sort = async (id: string, key: string) =>
    await sortCards(setConfig({ data: { id, key } }, 'sortCards'))

  const save = async (column: IColumn): Promise<IColumn | null> => {
    const toSave = {
      id: column.id,
      title: column.title,
      boardId: column.boardId,
      pos: column.pos,
      color: column.color,
    } as IColumn

    const { data } = await saveColumn(setConfig({ data: toSave }, 'saveColumn'))
    return data?.saveCard
  }

  return {
    sort,
    remove,
    move,
    save,
    loading: !(
      !moveResp.loading &&
      !saveResp.loading &&
      !deleteResp.loading &&
      !sortResp.loading
    ),
    error:
      moveResp.error || deleteResp.error || saveResp.error || sortResp.error,
  }
}
