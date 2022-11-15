import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Post from "../../components/Post";
import { AuthContext } from "../../context/AuthContext";
import { comment } from "../../interface/comment";
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

  const fetchPost = () => {
    const res = apiService.get.GET_POST_BY_ID(postId as string);
    return res;
  };
  const { data, isLoading, error } = useQuery(["fetchPost"], fetchPost);
  const postData = data?.data;
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    const commentData = {
      comment: formik.values.comment,
      postId: postId,
    };
    apiService.post
      .CREATE_COMMENT(commentData)
      .then(() => toast.success("Your comment has been added"))
      .catch((error) => toast.error(error.response.data.error));
  };
  console.log(postData);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (data) {
    return (
      <div className="my-6 px-3 max-w-4xl mx-auto">
        <div>
          <Post post={postData} />
        </div>
        <div
          className="-mt-1 rounded-b-md bg-white p-6 text-xs font-semibold 
          "
        >
          <p className="text-xs font-semibold ">
            Comment as <span className="font-normal">{userName}</span>
          </p>
          <form
            className="flex max-w-4-xl flex-col mt-2"
            onSubmit={(e) => {
              formik.handleSubmit(e);
            }}
          >
            <textarea
              disabled={!loggedIn}
              rows={4}
              id="comment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
              className="h-24 rounded-md border border-gray-200 p-2 pl-4 
              outline-none disabled:bg-gray-50 resize-none"
              placeholder={
                loggedIn
                  ? "What are your thoughts?"
                  : "Please sign in to comment"
              }
            />
            <button type="submit" className="mt-4">
              Comment
            </button>
            {postData.comments.map((comment: comment) => (
              <div>
                <div>{comment.body}</div>
                <div>{comment.createdAt}</div>
                <div>{comment.likes}</div>
                <div>{comment.postedBy.userName}</div>
                <div>{comment.postedBy.image}</div>
              </div>
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default PostPage;
