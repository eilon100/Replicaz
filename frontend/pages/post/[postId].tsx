import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Post from "../../components/Feed/Post/Post";
import NewComment from "../../components/Feed/Post/components/NewComment";
import { comment } from "../../types/comment";
import SinglePostLoading from "../../UI/loadings/SinglePostLoading";
import { apiService } from "../../utills/apiService";
import Comment from "../../components/Feed/Post/components/Comment";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { postId } = ctx.query;
  return { props: { postId } };
};

type postPage = {
  postId: string;
};
function PostPage({ postId }: postPage) {
  useEffect(() => {
    sessionStorage.setItem("scroll-position-post-id-marker", postId as string);
  }, []);

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
    return <div>Post not found</div>;
  }

  if (postData) {
    return (
      <div className="my-6 px-3 max-w-4xl mx-auto">
        <Post post={postData} page="singlePost" />
        <div
          className="-mt-1 rounded-b-md bg-main px-6 py-5 text-xs font-semibold 
          "
        >
          <NewComment />
          {postData.comments.map((comment: comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      </div>
    );
  }
}

export default PostPage;
