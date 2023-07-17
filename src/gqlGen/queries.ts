import {
  GetAnimeListQuery,
  GetAnimeListQueryVariables,
  GetGenreCollectionQuery,
  GetGenreCollectionQueryVariables,
  GetMediaByIdQuery,
  GetMediaByIdQueryVariables,
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
      query GetAnimeList($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media {
            id
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

export async function getGenreCollection({
  variables,
  client,
}: {
  variables: GetGenreCollectionQueryVariables;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<GetGenreCollectionQuery> {
  const { data } = await client.query({
    query: gql`
      query GetGenreCollection {
        GenreCollection
      }
    `,
    variables,
  });
  return data;
}

export async function getMediaById({
  variables,
  client,
}: {
  variables: GetMediaByIdQueryVariables;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<GetMediaByIdQuery> {
  const { data } = await client.query({
    query: gql`
      query GetMediaById($mediaId: Int) {
        Media(id: $mediaId) {
          bannerImage
          description
          id
        }
      }
    `,
    variables,
  });
  return data;
}
