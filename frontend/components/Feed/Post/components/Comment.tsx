import { Textarea, Typography } from '@mui/joy';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useContext, FC, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useQueryClient } from 'react-query';
import ReactTimeago from 'react-timeago';
import { AuthContext } from '../../../../context/AuthContext';
import { comment } from '../../../../types/comment';
import ConfirmModal from '../../../../UI/modals/ConfirmModal';
import InputModal from '../../../../UI/modals/InputModal';
import { apiService } from '../../../../utills/apiService';
import { postValidationSchema } from '../../../../validation/post';

interface CommentProps {
  comment: comment;
}

function Comment({ comment }: CommentProps) {
  const { state } = useContext(AuthContext);
  const { loggedIn, userId } = state;
  const [commentLiked, setCommentLiked] = useState(
    comment.likes.includes(userId)
  );
  const [reportModal, setReportModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentLength, setCommentLength] = useState(comment.likes.length);
  const [editComment, setEditComment] = useState(false);
  const queryClient = useQueryClient();
  const {
    handleChange,
    handleBlur,
    values: { body: valuesBody },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      body: comment?.body,
    },
    validationSchema: postValidationSchema('comment'),
    onSubmit: () => {
      commentEditHandler();
    },
  });

  const commentEditHandler = () => {
    const editedCommentData = {
      body: valuesBody,
      commentId: comment._id,
    };
    apiService.patch
      .EDIT_COMMENT(editedCommentData)
      .then(({ data: { message } }) => {
        toast.success(message);
        setEditComment(false);
        queryClient.fetchQuery('fetchPost');
        resetForm();
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  const commentLikeHandler = () => {
    const commentId = { commentId: comment._id };

    apiService.post
      .LIKE_COMMENT(commentId)
      .then(({ data: { like, likesLength } }) => {
        if (like) {
          setCommentLiked(true);
          setCommentLength(likesLength);
        } else {
          setCommentLiked(false);
          setCommentLength(likesLength);
        }
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  const commentDeleteHandler = () => {
    const notification = toast.loading('Deleting comment...');
    const data = { commentId: comment._id };

    apiService.post
      .DELETE_COMMENT(data)
      .then(({ data: { message } }) => {
        toast.success(message, {
          id: notification,
        });
        queryClient.fetchQuery('fetchPost');
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error, {
          id: notification,
        });
      });
  };

  const commentReportHandler = (body: string) => {
    const data = { commentId: comment._id, body };

    apiService.post
      .REPORT_COMMENT(data)
      .then(({ data: { message } }) => {
        toast.success(message);
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  const header = () => {
    return (
      <div className="px-6 py-1 mt-3">
        <div className="flex items-center space-x-2 -ml-[38px] mb-1">
          <div className="relative h-8 w-8 ">
            <Image
              className=" rounded-full "
              objectFit="cover"
              src={
                comment.postedBy.image ||
                'https://res.cloudinary.com/dcpuvkirc/image/upload/v1667998882/defualt%20images/blank-profile-picture-gf01729628_1280_pdfkow.png'
              }
              layout="fill"
            />
          </div>
          <div className="flex items-center font-semibold text-xs xs:text-lg ">
            <a
              href={`/user/${comment.postedBy?.userName}`}
              className="hover:underline"
            >
              {comment.postedBy?.userName}
            </a>
            &nbsp;·&nbsp;
            <ReactTimeago
              date={comment.createdAt}
              className="font-[400] text-[0.5rem] xs:text-xs text-[#65676B]"
            />
          </div>
        </div>
      </div>
    );
  };

  const body = () => {
    return (
      <div className="flex w-full items-center justify-center mb-2">
        {!editComment ? (
          <>
            <p className="text-sm xs:text-[20px] font-normal w-full ">
              {comment.body}
            </p>
            <div
              className="flex items-center gap-1"
              onClick={() => (loggedIn ? commentLikeHandler() : '')}
            >
              <span className=" text-xs">{commentLength}</span>
              {commentLiked ? (
                <AiFillHeart
                  className={`text-sm ${loggedIn ? 'cursor-pointer' : ''}`}
                />
              ) : (
                <AiOutlineHeart
                  className={`text-sm ${loggedIn ? 'cursor-pointer' : ''}`}
                />
              )}
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="w-full"
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
              value={valuesBody}
              placeholder="Edit comment.."
              variant="soft"
              className=" h-20 xs:h-28 font-normal rounded-md border border-gray-200 pl-4 text-xs xs:text-base before:shadow-none"
              endDecorator={
                <Typography className=" text-[0.5rem] ml-auto  text-text-third xs:text-xs">
                  {300 - valuesBody.length} character(s)
                </Typography>
              }
            />
            <div className="flex justify-end items-center gap-2 font-semibold mt-1">
              <button
                type="reset"
                onClick={() => {
                  setEditComment(false);
                }}
              >
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const footer = () => {
    return (
      !editComment && (
        <div className="flex items-center gap-2 text-[0.6rem] xs:text-xs text-text-second">
          {userId === comment.postedBy._id ? (
            <>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setEditComment(true)}
              >
                Edit
              </span>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </span>
            </>
          ) : (
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setReportModal(true)}
            >
              Report
            </span>
          )}
        </div>
      )
    );
  };

  return (
    <div key={comment._id}>
      <InputModal
        modalOpen={reportModal}
        setModalOpen={setReportModal}
        functionHandler={commentReportHandler}
      />
      <ConfirmModal
        modalOpen={deleteModal}
        setModalOpen={setDeleteModal}
        functionHandler={commentDeleteHandler}
        action="delete"
        page="comment"
      />
      {header()}
      <div className="border-l-2 px-6 flex flex-col xs:gap-2 ">
        {body()}
        {loggedIn ? footer() : ''}
      </div>
    </div>
  );
}

export default Comment;
