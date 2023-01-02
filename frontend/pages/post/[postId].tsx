import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery} from "react-query";
import Post from "../../components/Feed/Post/Post";
import AllComments from "../../components/Feed/Post/components/AllComments";
import NewComment from "../../components/Feed/Post/components/NewComment";
import { AuthContext } from "../../context/AuthContext";
import { comment } from "../../types/comment";
import SinglePostLoading from "../../UI/loadings/SinglePostLoading";
import { apiService } from "../../utills/apiService";

function PostPage() {
  const router = useRouter();
  const { postId } = router.query;

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
        <Post post={postData} page="SinglePost" />
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
