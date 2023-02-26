import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import CommunityPage from "../../components/community-page/CommunityPage";
import PageHead from "../../UI/pages/pageHead";
import PageNotFound from "../../UI/pages/PageNotFound";
import { apiService } from "../../utills/apiService";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await apiService.get.GET_COMMUNITY_ITEMS_DATA(ctx);

    return { props: { data } };
  } catch (err: any) {
    console.log(err.response);

    return { props: { error: err.response.data } };
  }
};

function index({ data, error }: any) {
  const router = useRouter();
  const { page } = router.query;

  if (error) {
    return <div>error loading this page</div>;
  }
  if (page === "shoes" || page === "bags" || page === "clothes") {
    return (
      <div>
        <PageHead title={` ${page.charAt(0).toUpperCase() + page.slice(1)}`} />
        <CommunityPage page={page} itemsData={data} />
      </div>
    );
  }

  return <PageNotFound />;
}
export default index;
