"use client";

import { FC, memo, useContext } from "react";
import { useQuery } from "@apollo/client";
import { ApolloClientContext } from "@/libs/apollo/ApolloProvider";

interface Props {
  description?: string;
  mediaId: number;
}

import getMediaById from "@/libs/gql/getMediaById.gql";
import Link from "next/link";

const MediaPageContent: FC<Props> = ({ description, mediaId }) => {
  const { data } = useQuery(getMediaById, {
    variables: {
      mediaId,
    },
    skip: typeof window === "undefined" && !!description,
    onCompleted() {
      console.log("CLIENT SIDE");
    },
  });

  const dataForRender = description || data?.Media?.description || null;

  console.log({ dataForRender });

  return (
    <div>
      <div className="mb-1">
        <Link href={"/"}>BACK</Link>
      </div>
      {dataForRender}
    </div>
  );
};

export default memo(MediaPageContent);
