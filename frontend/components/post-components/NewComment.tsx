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
  const { loggedIn } = state;
  const { postId } = router.query;
  const queryClient = useQueryClient();

  const {
    handleChange,
    handleBlur,
    values: { comment: valuesComment },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: () => {
      NewCommentHandler();
    },
  });

  const NewCommentHandler = () => {
    const commentData = {
      comment: valuesComment,
      postId,
    };

    apiService.post
      .CREATE_COMMENT(commentData)
      .then(() => {
        toast.success("Your comment has been added");
        queryClient.fetchQuery("fetchPost");
        resetForm();
      })
      .catch(
        ({
          response: {
            data ,
          },
        }) => toast.error(data.error)
      );
  };

  const newCommentForm = () => {
    return (
      <form
        className="flex max-w-4-xl flex-col mt-2"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <textarea
          disabled={!loggedIn}
          rows={4}
          id="comment"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesComment}
          className="h-24 rounded-md border border-gray-200 p-2 pl-4 
      outline-none disabled:bg-gray-50 resize-none"
          placeholder={
            loggedIn ? "What are your thoughts?" : "Please sign in to comment"
          }
        />
        <button
          type="submit"
          className="mt-4"
          disabled={!loggedIn || valuesComment.length === 0}
        >
          Comment
        </button>
      </form>
    );
  };

  return <div>{newCommentForm()}</div>;
}

export default NewComment;
