import MediaList from "@/components/MediaList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/client"} prefetch={false}>
        ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </Link>
      <Link href={"/client/1"} prefetch={false}>
        1111111111
      </Link>
      <MediaList />
    </div>
  );
}
