import type { NextPage } from "next";
import Head from "next/head";
import PostBox from "../components/PostBox/PostBox";
import Feed from "../components/Feed/Feed";
import PageHead from "../UI/pages/pageHead";

const Home: NextPage = () => {
  return (
    <>
      <PageHead/>
      <div className="my-6 px-3 max-w-4xl mx-auto ">
        <PostBox currentPage="main" />
        <Feed currentPage="main" />
      </div>
    </>
  );
};

export default Home;
