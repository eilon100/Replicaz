import React from "react";
import Head from "next/head";
type pageHeadProps = { title?: string };
function PageHead({ title }: pageHeadProps) {
  return (
    <Head>
      {title ? <title>Replicaz | {title}</title> : <title>Replicaz</title>}
      <link rel="icon" href="/SiteLogo.svg" />
    </Head>
  );
}

export default PageHead;
