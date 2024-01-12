import { useMutation, useQuery } from '@apollo/client'
import { Board } from '../types/board'
import { CREATE_BOARD } from '../apollo/mutation/board'
import { GET_BOARDS, GET_BOARD_BY_ID } from '../apollo/queries/board'

export const useCreateBoard = () => {
  const [createBoard, { loading, error }] = useMutation(CREATE_BOARD)

  const create = async (data: {
    title: string
  }): Promise<Board | null | undefined> => {
    console.log(JSON.stringify(data))
    const result = await createBoard({
      variables: {
        data: { ...data },
      },
      refetchQueries: [GET_BOARDS],
    })

    return result.data.createBoard
  }

  return {
    create,
    loading,
    error,
  }
}

export const useGetBoardById = (boardId?: string) => {
  const { data, loading, error } = useQuery<{
    board: Board
  }>(GET_BOARD_BY_ID, {
    variables: { id: boardId },
    skip: !boardId,
  })

  return { data: data?.board, loading, error }
}
