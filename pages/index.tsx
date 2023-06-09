import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SearchList from "@/components/searchList/SearchList";
import Category from "@/components/category";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ZoomZoom</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/zoomzoomtour-logo.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Category />
        <SearchList />
      </main>
    </>
  );
}
