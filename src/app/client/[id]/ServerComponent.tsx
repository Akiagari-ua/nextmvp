// import dynamic from "next/dynamic";
import MediaPageContent from "@/components/MediaPage/MediaPageContent";
import getClient from "@/libs/apollo/getClient";
import { getMediaById } from "@/gqlGen/queries";

interface Props {
  params: {
    mediaId: string;
  };
}

async function ServerComponent({ params }: Props) {
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

export default ServerComponent;
