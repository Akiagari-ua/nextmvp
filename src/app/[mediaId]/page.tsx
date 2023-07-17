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
export default async function Index({ params }: Props) {
  const isClient = cookies().get("isClient");
  console.log({ isClient });
  if (isClient?.value === "true") {
    return (
      <main className="flex  flex-col items-center justify-between p-24">
        <MediaPageContent mediaId={Number(params.mediaId)} />
      </main>
    );
  }

  const client = getClient();
  const data = await getMediaById({
    client,
    variables: {
      mediaId: Number(params.mediaId),
    },
  });

  console.log("ssr");

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <MediaPageContent
        mediaId={Number(params.mediaId)}
        description={data.Media?.description || ""}
      />
    </main>
  );
}
