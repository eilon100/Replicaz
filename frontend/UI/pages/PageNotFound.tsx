import React from "react";
import Head from "next/head";

function PageNotFound() {
  return (
    <div className="flex flex-col h-[70%] w-full justify-center items-center">
      <Head>
        <title>Page not found</title>
        <link rel="icon" href="/sneaker.png" />
      </Head>
      <div className=" flex items-center ">
        <h1 className=" border-r-4 text-4xl px-4 py-2 font-bold">404</h1>
        <p className="text-xl px-4 py-2 font-medium">
          This page could not be found
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
