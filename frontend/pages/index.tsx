import type { NextPage } from "next";
import Head from "next/head";
import PostBox from "../components/PostBox";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Replicaz</title>
        <link rel="icon" href="/sneaker.png" />
      </Head>
      <div className="my-6 px-3 max-w-4xl mx-auto ">
        <PostBox />
        <Feed />
      </div>
    </>
  );
};

export default Home;
