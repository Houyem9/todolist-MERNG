import { gql } from '@apollo/client'

const GET_TASKS = gql`
  query getTasks{
    getTasks{
        _id
        title
    }
}
`

export { GET_TASKS }
