"use client";
import { PropsWithChildren, FC } from "react";
import MediaList from "@/components/MediaList";

export const revalidate = 1;

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

function getRandomInt() {
  return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
}

const Home: FC = () => {
  console.log({ isSsr: typeof window === "undefined" });

  return (
    <Wrapper>
      <MediaList />
    </Wrapper>
  );
};

export default Home;
