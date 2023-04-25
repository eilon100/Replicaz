import { Textarea } from '@mui/joy';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { AuthContext } from '../../../../context/AuthContext';
import { apiService } from '../../../../utills/apiService';
import { postValidationSchema } from '../../../../validation/post';

function NewComment() {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { loggedIn } = state;
  const { postId } = router.query;
  const queryClient = useQueryClient();
  const { userName } = state;
  const {
    handleChange,
    isSubmitting,
    handleBlur,
    values: { body: valuesComment },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: postValidationSchema('comment'),
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
        toast.success('Your comment has been added');
        queryClient.fetchQuery('fetchPost');
        resetForm();
      })
      .catch(({ response: { data } }) => toast.error(data.error));
  };

  const newCommentForm = () => {
    return (
      <form
        className="flex flex-col mt-2"
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
              dir: 'auto',
            },
          }}
          name="body"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesComment}
          placeholder={
            loggedIn ? 'What are your thoughts?' : 'Please sign in to comment'
          }
          variant="soft"
          className="h-20 xs:h-28 rounded-md border border-gray-200 pl-4 
           text-xs xs:text-base before:shadow-none"
          endDecorator={
            <Typography className=" text-[0.5rem] ml-auto text-text-third xs:text-xs">
              {300 - valuesComment.length} character(s)
            </Typography>
          }
        />
        <button
          type="submit"
          className="mt-4"
          disabled={!loggedIn || valuesComment.length === 0 || isSubmitting}
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
