import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getGenreCollection } from "@/gqlGen/queries";
import ApolloProvider from "@/libs/apollo/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import getClient from "@/libs/apollo/getClient";
import RevalidateCookie from "@/components/RevalidateCookie/RevalidateCookie";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getClient();
  const data = await getGenreCollection({ client, variables: {} });

  return (
    <html lang="en">
      <body className={inter.className}>
        <RevalidateCookie />
        <Header list={data.GenreCollection || []} />
        <ApolloProvider>{children}</ApolloProvider>
        <Footer />
      </body>
    </html>
  );
}
