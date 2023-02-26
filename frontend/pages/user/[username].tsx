import React, { useContext } from "react";
import UserPage from "../../components/User/UserPage";
import { GetServerSideProps } from "next";
import { apiService } from "../../utills/apiService";
import PageNotFound from "../../UI/pages/PageNotFound";
import PageHead from "../../UI/pages/pageHead";
import { AuthContext } from "../../context/AuthContext";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await apiService.get.GET_USER_DATA(ctx);

    return { props: { data } };
  } catch (err: any) {
    return { props: { error: err.response.data } };
  }
};

function username({ data, error }: any) {
  const {
    state: { userId },
  } = useContext(AuthContext);
  const myProfile = data._id === userId;

  if (error) {
    return <PageNotFound />;
  }

  return (
    <div>
      <PageHead title={`${myProfile ? "" : data.userName} Profile`} />
      <UserPage userData={data} />
    </div>
  );
}

export default username;
