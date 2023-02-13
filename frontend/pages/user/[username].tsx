import React from "react";
import UserPage from "../../components/User/UserPage";
import { GetServerSideProps } from "next";
import { apiService } from "../../utills/apiService";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await apiService.get.GET_USER_DATA(ctx);

    return { props: { data } };
  } catch (err: any) {
    return { props: { error: err.response.data } };
  }
};

function username({ data, error }: any) {
  if (error) {
    return <div>Could not find this user</div>;
  }

  return (
    <div>
      <UserPage userData={data} />
    </div>
  );
}

export default username;
