import { FC, memo } from "react";
import { getAnimeList } from "@queries";
import getClient from "@/libs/apollo/getClient";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;

//@ts-ignore
const MediaList: FC<{ perPage?: number }> = async ({ perPage }) => {
  const isSsr = typeof window === "undefined";

  if (isSsr) {
    console.log("SSSSSRRRRRR!!!!!");
  }

  console.log("MediaList!!!!!");

  const client = getClient();

  const { Page } = await getAnimeList({
    client,
    variables: { page: 1, perPage: perPage || 30 },
  });

  return (
    <div className="flex gap-3 row-span-1 flex-wrap ">
      {Page?.media?.map((mediaItem) => (
        <div
          key={mediaItem?.title?.english}
          className="h-[265px] w-[185px] relative"
        >
          <Link
            href={`/suspense/${mediaItem?.id}`}
            prefetch={false}
            shallow={true}
          >
            <Image
              src={mediaItem?.coverImage?.medium || ""}
              alt="Picture of the author"
              fill
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default memo(MediaList);
