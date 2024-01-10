import { gql } from '@apollo/client'

export const CREATE_BOARD = gql`
  mutation Mutation($data: CreateBoardInput!) {
    createBoard(data: $data) {
      id
      title
      color
      columns {
        id
        title
        pos
      }
    }
  }
`
