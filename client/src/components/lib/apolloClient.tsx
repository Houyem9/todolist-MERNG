import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === `undefined`, // set to true
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GPRAQL_SERVER_URI,
    }),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
