import {
  GetAnimeListQuery,
  GetAnimeListQueryVariables,
  GetPageQuery,
  GetPageQueryVariables,
} from "./types";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import gql from "graphql-tag";

export async function getAnimeList({
  variables,
  client,
}: {
  variables: GetAnimeListQueryVariables;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<GetAnimeListQuery> {
  const { data } = await client.query({
    query: gql`
      query GetAnimeList($type: MediaType) {
        MediaList(type: $type) {
          media {
            coverImage {
              color
            }
          }
        }
      }
    `,
    variables,
  });
  return data;
}

export async function getPage({
  variables,
  client,
}: {
  variables: GetPageQueryVariables;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<GetPageQuery> {
  const { data } = await client.query({
    query: gql`
      query getPage($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          characters {
            name {
              full
            }
          }
        }
      }
    `,
    variables,
  });
  return data;
}
