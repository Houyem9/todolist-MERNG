import { gql } from '@apollo/client'

const DELETE_ONE_TASK = gql`
 mutation deleteOneTask($_id: ID!){
    deleteOneTask(_id:$_id)
}
`

export { DELETE_ONE_TASK }
