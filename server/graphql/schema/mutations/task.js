const taskInput = `
    title: String!
`
const updateTaskInput = `
    _id: ID !,
    title: String!
`
export const task = `
addNewTask(${taskInput}): Task
updateTask(${updateTaskInput}): Boolean
deleteOneTask(_id: ID!): Boolean
`