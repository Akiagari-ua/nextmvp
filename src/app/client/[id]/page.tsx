"use client";

import { FC, PropsWithChildren } from "react";
import ServerComponent from "./ServerComponent";
interface Props {
  params: {
    mediaId: string;
  };
}

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

const Index = ({ params }: Props) => {
  const isSsr = typeof window === "undefined";

  return (
    <Wrapper>
      {/* @ts-ignore */}
      <ServerComponent
        params={{
          //@ts-ignore
          mediaId: params.id,
        }}
      />
    </Wrapper>
  );
};

export default Index;
