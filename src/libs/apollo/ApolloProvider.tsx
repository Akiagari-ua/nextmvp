"use client";
import { createContext, PropsWithChildren, FC, useMemo } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

const getter = () =>
  new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
  });

export const ApolloClientContext = createContext<{
  client: ApolloClient<NormalizedCacheObject> | null;
}>({
  client: null,
});

const ApolloProviderContext: FC<PropsWithChildren> = ({ children }) => {
  const value = useMemo(
    () => ({
      client: getter(),
    }),
    []
  );

  return <ApolloProvider client={value.client}>{children}</ApolloProvider>;
};

export default ApolloProviderContext;
