import { FC, memo } from "react";
import getClient from "@/libs/apollo/getClient";
import { cookies } from "next/headers";

import { getMediaById } from "@/gqlGen/queries";
import dynamic from "next/dynamic";
import MediaPageContentServer from "./MediaPageContent";

const MediaPageContent = dynamic(() => import("./MediaPageContent"), {
  ssr: false,
});

interface Props {
  mediaId: string;
}
//@ts-ignore
export const MediaPage: FC<Props> = async ({ mediaId }) => {
  const client = getClient();
  const media = await getMediaById({
    client,
    variables: {
      mediaId: Number(mediaId),
    },
  });

  console.log("SSSSSRRRRRRR");

  return (
    <MediaPageContentServer
      mediaId={Number(mediaId)}
      description={media.Media?.description || ""}
    />
  );
};

export default memo(MediaPage);
