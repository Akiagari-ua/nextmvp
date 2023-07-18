// import dynamic from "next/dynamic";
import MediaPageContent from "@/components/MediaPage/MediaPageContent";
import getClient from "@/libs/apollo/getClient";
import { cookies } from "next/headers";
import { getMediaById } from "@/gqlGen/queries";
interface Props {
  params: {
    mediaId: string;
  };
}

function waitTenSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("10 seconds have passed");
    }, 10000); // Задержка в 10 000 миллисекунд (10 секунд)
  });
}
export default async function Index({ params }: Props) {
  const client = getClient();
  const data = await getMediaById({
    client,
    variables: {
      mediaId: Number(params.mediaId),
    },
  });

  await waitTenSeconds();

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <MediaPageContent
        mediaId={Number(params.mediaId)}
        description={data.Media?.description || ""}
      />
    </main>
  );
}
