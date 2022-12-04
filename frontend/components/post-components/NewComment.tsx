import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import { apiService } from "../../utills/apiService";

function NewComment() {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { loggedIn, userName, userImage } = state;
  const { postId } = router.query;

  const queryClient = useQueryClient();

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
      .then(() => {
        toast.success("Your comment has been added");
        queryClient.fetchQuery("fetchPost");
        formik.resetForm();
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  const newCommentForm = () => {
    return (
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
            loggedIn ? "What are your thoughts?" : "Please sign in to comment"
          }
        />
        <button
          type="submit"
          className="mt-4"
          disabled={!loggedIn || formik.values.comment.length === 0}
        >
          Comment
        </button>
      </form>
    );
  };

  return <div>{newCommentForm()}</div>;
}

export default NewComment;
