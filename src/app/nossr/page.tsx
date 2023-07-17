import dynamic from "next/dynamic";
export const revalidate = 10;

const NoSsrMediaList = dynamic(() => import("@/components/MediaList"), {
  ssr: false,
});

function getRandomInt() {
  return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
}

export default function Home() {
  return (
    <div>
      <NoSsrMediaList perPage={getRandomInt()} />
    </div>
  );
}
