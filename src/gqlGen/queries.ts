import { GetAnimeListQuery, GetAnimeListQueryVariables } from "./types";
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
      query GetAnimeList($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media {
            coverImage {
              medium
            }
            genres
            title {
              english
            }
          }
        }
      }
    `,
    variables,
  });
  return data;
}
