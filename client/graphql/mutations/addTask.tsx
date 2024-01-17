import { gql } from '@apollo/client'

const ADD_TASK = gql`
mutation addNewTask($title:String!){
    addNewTask(title: $title){
        _id
        title
    }
}
`

export { ADD_TASK }
