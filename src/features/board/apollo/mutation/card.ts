import { gql } from '@apollo/client'

export const SAVE_CARD = gql`
  mutation Mutation($data: SaveCardInput!) {
    saveCard(data: $data) {
      id
      title
      pos
      columnId
      boardId
    }
  }
`

export const MOVE_CARD = gql`
  mutation Mutation($data: MoveCardInput!) {
    moveCard(data: $data) {
      id
      boardId
    }
  }
`

export const DELETE_CARDS = gql`
  mutation Mutation($id: String!) {
    deleteCard(id: $id) {
      id
      boardId
    }
  }
`
