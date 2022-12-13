import Image from "next/image";
import React, { useContext, FC, useEffect } from "react";
import toast from "react-hot-toast";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import ReactTimeago from "react-timeago";
import { apiService } from "../utills/apiService";
import ImageSwiper from "./post-components/ImageSwiper";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PostOptions from "./post-components/PostOptions";
import { Textarea } from "@mui/joy";
import { Typography } from "@mui/material";
import { useQueryClient } from "react-query";
import Link from "next/link";
import { post } from "../types/post";
import { postValidationSchema } from "../validation/post";
import { TextField } from "@mui/material";
interface PostProps {
  post: post;
  page?: string;
}

const Post: FC<PostProps> = ({ post, page }) => {
  const { state } = useContext(AuthContext);
  const { loggedIn, userId } = state;
  const [postLiked, setPostLiked] = useState(post.likes.includes(userId));
  const [likesLength, setLikesLength] = useState(post.likes.length);
  const [editPost, setEditPost] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleChange,
    handleBlur,
    values: { body: valuesBody, title: valuesTitle },
    errors: { body: errorsBody, title: errorsTitle },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: post?.title,
      body: post?.body,
    },
    validationSchema: postValidationSchema("edit"),
    onSubmit: (s) => {
      editPostHandler();
    },
  });

  const likePostHandler = () => {
    const data = { postId: post._id };

    apiService.post
      .LIKE_POST(data)
      .then(({ data: { like, likesLength } }) => {
        like
          ? (setPostLiked(true), setLikesLength(likesLength))
          : (setPostLiked(false), setLikesLength(likesLength));
        queryClient.invalidateQueries("posts");
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };
  const editPostHandler = () => {
    const editedPostData = {
      title: valuesTitle,
      body: valuesBody,
      postId: post._id,
    };

    apiService.patch
      .EDIT_POST(editedPostData)
      .then(({ data: { message } }) => {
        toast.success(message);
        setEditPost(false);
        queryClient.refetchQueries(page === "post" ? "fetchPost" : "posts");
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };
  const persistScrollPosition = (id: string) => {
    sessionStorage.setItem("scroll-position-post-id-marker", id);
  };

  const Header = () => {
    return (
      <header className=" flex items-center mb-2 justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 -ml-2">
            <Image
              className=" rounded-full "
              objectFit="contain"
              src={post?.postedBy.image || "/../public/EmptyProfile.png"}
              layout="fill"
            />
          </div>
          <div className="flex items-center">
            <div className=" font-bold text-sm xs:text-xl">
              {post.community}
            </div>
            <div className=" font-[400] mt-[1px] text-[0.5rem] xs:text-xs text-[#65676B] ">
              &nbsp; - Posted by {post.postedBy?.userName}&nbsp;
              <ReactTimeago date={post.createdAt} />
            </div>
          </div>
        </div>
        {loggedIn ? (
          <PostOptions
            postId={post._id}
            userPost={post.postedBy._id === userId}
            saves={post.saves}
            setEditPost={setEditPost}
          />
        ) : (
          ""
        )}
      </header>
    );
  };
  const Body = () => {
    return (
      <>
        {!editPost ? (
          <div>
            <div className=" font-semibold text-text-main text-2xl " dir="auto">
              <h1>{post?.title}</h1>
            </div>
            <div className="text-text-main font-[400]" dir="auto">
              <p>{post?.body}</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              className=" flex-1 w-full min-w-[80px] mb-2 "
              type="text"
              name="title"
              disabled={!loggedIn}
              sx={{
                fieldset: { border: "none" },
              }}
              inputProps={{
                dir: "auto",
                className: "h-2 bg-second rounded-md",
                maxLength: 50,
              }}
              placeholder={"Title"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={valuesTitle}
              error={!!errorsTitle}
              helperText={errorsTitle}
            />

            <Textarea
              minRows={4}
              maxRows={4}
              componentsProps={{
                textarea: {
                  maxLength: 300,
                  dir: "auto",
                },
              }}
              name="body"
              onChange={handleChange}
              onBlur={handleBlur}
              value={valuesBody}
              placeholder="Text (optional)"
              variant="soft"
              disabled={!loggedIn}
              className="flex-1 pl-3 bg-second  rounded-md text-xs xs:text-base"
              endDecorator={
                <Typography className="text-[0.5rem] xs:text-xs ml-auto text-text-third">
                  {300 - valuesBody.length} character(s)
                </Typography>
              }
            />
            <div className="flex justify-end items-center mt-2 gap-2 font-semibold text-xs xs:text-base">
              <button
                type="reset"
                onClick={() => {
                  setEditPost(false);
                }}
              >
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}

        <div className="mt-4">
          <ImageSwiper arr={post?.images} />
        </div>
        <div className="flex justify-between items-center mt-4 text-[#65676B] text-xs md:text-sm">
          <div>{likesLength} Likes</div>
          <div>{post.comments.length} Comments</div>
        </div>
      </>
    );
  };
  const Footer = () => {
    return (
      <footer className="flex items-center justify-around mt-3 pt-1 border-t-[1px] ">
        <div
          className={`postButtons ${postLiked ? "text-blue-600" : ""}`}
          onClick={() => {
            loggedIn
              ? likePostHandler()
              : toast.error("Please sign in to like");
          }}
        >
          <BiLike />
          <p>Like</p>
        </div>

        <Link href={`/post/${post._id}`}>
          <div
            className="postButtons"
            onClick={() => {
              persistScrollPosition(post._id);
            }}
          >
            <BiComment className="mt-[2px]" />
            <p>Comment</p>
          </div>
        </Link>

        <CopyToClipboard
          text={`${window.location}/post/${post._id}`}
          onCopy={() => toast.success("Copied to clipboard")}
        >
          <div className="postButtons">
            <BiShare />
            <p>Share</p>
          </div>
        </CopyToClipboard>
      </footer>
    );
  };

  return (
    <div className="bg-main mt-2 pt-3 pb-1 px-6 rounded-md shadow-sm">
      {Header()}
      {Body()}
      {Footer()}
    </div>
  );
};

export default Post;
