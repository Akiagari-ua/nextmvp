import { cache } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const getter = () => new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
});



function registerApolloClient(makeClient: () => ApolloClient<any>) {
    const getClient = cache(makeClient);
    return {
        getClient,
    };
}

const { getClient } = registerApolloClient(getter)

export default getClient