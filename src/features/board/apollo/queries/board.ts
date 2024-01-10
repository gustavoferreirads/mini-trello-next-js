import { gql } from '@apollo/client'

export const GET_BOARDS = gql`
  query {
    boards {
      id
      title
      color
    }
  }
`
export const GET_BOARD_BY_ID = gql`
  query GetBoard($id: String!) {
    board(id: $id) {
      id
      title
      color
      columns {
        id
        title
        pos
        boardId
        cards {
          id
          title
          description
          pos
          columnId
          boardId
          createdAt
        }
      }
    }
  }
`
