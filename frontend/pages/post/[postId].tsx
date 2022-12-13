import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useQuery, useQueryClient } from "react-query";
import ReactTimeago from "react-timeago";
import Post from "../../components/Post";
import AllComments from "../../components/post-components/AllComments";
import NewComment from "../../components/post-components/NewComment";
import { AuthContext } from "../../context/AuthContext";
import { comment } from "../../types/comment";
import SinglePostLoading from "../../UI/loadings/SinglePostLoading";
import { apiService } from "../../utills/apiService";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

function PostPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn, userName, userImage } = state;
  const { postId } = router.query;

  const fetchPost = () => apiService.get.GET_POST_BY_ID(postId);

  const {
    data: { data: postData } = {},
    isLoading,
    error,
  } = useQuery(["fetchPost"], fetchPost, {
    cacheTime: 0,
  });

  if (isLoading) {
    return <SinglePostLoading />;
  }
  if (error) {
    return <div>Error</div>;
  }

  if (postData) {
    return (
      <div className="my-6 px-3 max-w-4xl mx-auto">
        <Post post={postData} page="post" />
        <div
          className="-mt-1 rounded-b-md bg-main px-6 py-5 text-xs font-semibold 
          "
        >
          <NewComment />
          {postData.comments.map((comment: comment) => {
            return (
              <AllComments
                comment={comment}
                key={comment._id}
                postId={postId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostPage;
