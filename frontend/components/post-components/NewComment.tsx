import { Textarea } from "@mui/joy";
import { Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import { apiService } from "../../utills/apiService";
import { postValidationSchema } from "../../validation/post";

function NewComment() {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { loggedIn } = state;
  const { postId } = router.query;
  const queryClient = useQueryClient();
  const { userName } = state;
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
    validationSchema: postValidationSchema("comment"),
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
      .catch(({ response: { data } }) => toast.error(data.error));
  };

  const newCommentForm = () => {
    return (
      <form
        className="flex max-w-4-xl flex-col mt-2"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Textarea
          maxRows={4}
          minRows={4}
          disabled={!loggedIn}
          componentsProps={{
            textarea: {
              maxLength: 300,
              dir: "auto",
            },
          }}
          name="comment"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesComment}
          placeholder={
            loggedIn ? "What are your thoughts?" : "Please sign in to comment"
          }
          variant="soft"
          className="h-20 xs:h-28 rounded-md border border-gray-200 p-2 pl-4 
          outline-none disabled:bg-gray-50 resize-none text-xs xs:text-base"
          endDecorator={
            <Typography className=" text-[0.5rem] ml-auto text-gray-500  xs:text-xs">
              {300 - valuesComment.length} character(s)
            </Typography>
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

  return (
    <div>
      <p className="text-[0.6rem] xs:text-xs font-semibold ">
        Comment as <span className="font-normal">{userName}</span>
      </p>
      {newCommentForm()}
    </div>
  );
}

export default NewComment;
