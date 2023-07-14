import { cache } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const getClient = () => {
    const getter = () => new ApolloClient({
        uri: process.env.NEXT_PUBLIC_API_URL,
        cache: new InMemoryCache(),
    });

    return cache(getter)()
}

export default getClient