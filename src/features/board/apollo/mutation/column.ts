import { gql } from '@apollo/client'

export const SAVE_COLUMN = gql`
  mutation Mutation($data: SaveColumnInput!) {
    saveColumn(data: $data) {
      id
      title
      pos
      boardId
    }
  }
`

export const DELETE_COLUMN = gql`
  mutation Mutation($id: String!) {
    removeColumn(id: $id) {
      boardId
    }
  }
`
export const MOVE_COLUMN = gql`
  mutation Mutation($data: MoveColumnInput!) {
    moveColumn(data: $data) {
      boardId
    }
  }
`

export const SORT_COLUMN_CARDS = gql`
  mutation Mutation($data: SortColumnCardsInput!) {
    sortCards(data: $data) {
      boardId
    }
  }
`
