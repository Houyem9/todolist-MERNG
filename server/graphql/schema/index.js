// Module 
import { createSchema } from 'graphql-yoga'

// Imports 
import { Types } from './types/index.js'
import { Queries } from './queries/index.js'
import { Mutations } from './mutations/index.js'
import { resolver } from '../resolvers/index.js'


export const schema = createSchema({
    typeDefs: `
        ${Types.join('\n')}

        type Query {
            ${Queries.join('\n')}
        }

        type Mutation {
            ${Mutations.join('\n')}
        }
        schema {
            query: Query
            mutation: Mutation
        }`,
    resolvers: resolver
})