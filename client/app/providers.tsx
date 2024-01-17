// app/providers.tsx
'use client'

import createApolloClient from '@/components/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'


export function Providers({ children }: { children: React.ReactNode }) {
    const client = createApolloClient()
    return <ApolloProvider client={client}>
        <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
}