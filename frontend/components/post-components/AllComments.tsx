import { useFormik } from "formik";
import Image from "next/image";
import React, { useContext, FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useQueryClient } from "react-query";
import ReactTimeago from "react-timeago";
import { AuthContext } from "../../context/AuthContext";
import { comment } from "../../types/comment";
import { apiService } from "../../utills/apiService";
import InputModal from "../modals/InputModal";
import ReportModal from "../modals/InputModal";

interface AllCommentsProps {
  comment: comment;
  postId: string | string[] | undefined;
}

const AllComments: FC<AllCommentsProps> = ({ comment, postId }) => {
  const { state } = useContext(AuthContext);
  const { loggedIn, userId } = state;
  const [commentLiked, setCommentLiked] = useState(
    comment.likes.includes(userId)
  );
  const [modalOpen, setModalOpen] = React.useState(false);
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
        queryClient.fetchQuery("fetchPost");
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
    const notification = toast.loading("Deleting comment...");
    const data = { commentId: comment._id };

    apiService.post
      .DELETE_COMMENT(data)
      .then(({ data: { message } }) => {
        toast.success(message, {
          id: notification,
        });
        queryClient.fetchQuery("fetchPost");
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error, {
          id: notification,
        });
      });
  };

  const commentReportHandler = () => {
    setModalOpen(true);
  };

  const header = () => {
    return (
      <div className=" px-6 py-1 mt-3">
        <div className="flex items-center space-x-2 -ml-[38px] mb-1">
          <div className="relative h-8 w-8 ">
            <Image
              className=" rounded-full "
              objectFit="contain"
              src={comment.postedBy.image || "/../public/EmptyProfile.png"}
              layout="fill"
            />
          </div>
          <div className=" font-semibold text-[9px] xs:text-xs ">
            {comment.postedBy?.userName} &nbsp;
            <ReactTimeago
              date={comment.createdAt}
              className="font-normal text-[#65676B]"
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
            <p className=" text-[20px] font-normal w-full ">{comment.body}</p>
            <div
              className="flex items-center gap-1"
              onClick={() => (loggedIn ? commentLikeHandler() : "")}
            >
              <span className=" text-xs">{commentLength}</span>
              {commentLiked ? (
                <AiFillHeart
                  className={`text-sm ${loggedIn ? "cursor-pointer" : ""}`}
                />
              ) : (
                <AiOutlineHeart
                  className={`text-sm ${loggedIn ? "cursor-pointer" : ""}`}
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
            <div className=" font-semibold  text-[#050505] s ">
              <input
                id="body"
                dir="auto"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesBody}
                disabled={!loggedIn}
                className=" flex-1 w-full rounded-md bg-gray-50 p-2 pl-5 mb-2 outline-none"
                type="text"
                placeholder={"Body"}
              />
            </div>
            <div className="flex justify-end items-center gap-2 font-semibold">
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
        <div className="flex items-center gap-2">
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
                onClick={() => commentDeleteHandler()}
              >
                Delete
              </span>
            </>
          ) : (
            <span
              className="hover:underline cursor-pointer"
              onClick={() => commentReportHandler()}
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
        type="comment"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={comment._id}
      />
      {header()}
      <div className=" border-l-2 px-6 flex flex-col gap-2 ">
        {body()}
        {loggedIn ? footer() : ""}
      </div>
    </div>
  );
};

export default AllComments;
