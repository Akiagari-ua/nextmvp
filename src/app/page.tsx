import { getAnimeList } from "@queries";
import { MediaListStatus, MediaType } from "@/gqlGen/types";
import getClient from "@/libs/apollo/getClient";

const statusIn = Object.values(MediaListStatus);

export default async function Home() {
  const client = getClient();
  const data = await getAnimeList({
    client,
    variables: { page: 1, perPage: 30 },
  });
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      {JSON.stringify(data)}
    </main>
  );
}
