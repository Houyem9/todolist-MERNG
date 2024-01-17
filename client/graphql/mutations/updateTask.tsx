import { gql } from '@apollo/client'

const UPDATE_TASK = gql`
 mutation updateTask($_id: ID!, $title: String!){
    updateTask(_id: $_id, title: $title)
}
`

export { UPDATE_TASK }
