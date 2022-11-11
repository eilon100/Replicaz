import type { NextPage } from "next";
import Head from "next/head";
import PostBox from "../components/PostBox";
import Header from "../components/Header";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Replicaz</title>
        <link rel="icon" href="/sneaker.png" />
      </Head>

      <Header />
      <div className="my-6 px-3 max-w-4xl mx-auto ">
        <PostBox />
        <Feed />
      </div>
    </div>
  );
};

export default Home;
