import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, FC } from "react";
import toast from "react-hot-toast";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import ReactTimeago from "react-timeago";
import { apiService } from "../utills/apiService";
import ImageSwiper from "./post-components/ImageSwiper";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { postValidationSchema } from "../validation/post";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PostEdit from "./post-components/PostEdit";
import { Textarea } from "@mui/joy";
import { Typography } from "@mui/material";
import { useQueryClient } from "react-query";
import Link from "next/link";

interface PostProps {
  post: any;
  page?: string;
}

const Post: FC<PostProps> = ({ post, page }) => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { loggedIn, userId } = state;
  const [postLiked, setPostLiked] = useState(post.likes.includes(userId));
  const [likesLength, setLikesLength] = useState(post.likes.length);
  const [editPost, setEditPost] = useState(false);
  const queryClient = useQueryClient();

  const likePostHandler = (id: string) => {
    const postId = JSON.stringify({ postId: id });
    apiService.post
      .LIKE_POST(postId)
      .then((res) => {
        res.data.like
          ? (setPostLiked(true), setLikesLength(res.data.likesLength))
          : (setPostLiked(false), setLikesLength(res.data.likesLength));
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      body: post?.body,
    },
    validationSchema: postValidationSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    const editedPostData = {
      title: formik.values.title,
      body: formik.values.body,
      postId: post._id,
    };

    apiService.patch
      .EDIT_POST(editedPostData)
      .then((res) => {
        toast.success(res.data.message);
        setEditPost(false);
        queryClient.refetchQueries(page === "post" ? "fetchPost" : "posts");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
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
          <div className="font-bold text-[13px] xs:text-lg">
            {post.community}
          </div>
          <div className=" font-[400] text-[9px] xs:text-xs text-[#65676B]">
            - Posted by {post.postedBy?.userName}&nbsp;
            <ReactTimeago date={post.createdAt} />
          </div>
        </div>
        {loggedIn ? (
          <PostEdit
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
            <div className=" font-semibold text-[#050505] text-2xl " dir="auto">
              <h1>{post?.title}</h1>
            </div>
            <div className="text-[#050505 ] font-[400]" dir="auto">
              <p>{post?.body}</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              formik.handleSubmit(e);
            }}
          >
            <div className=" font-semibold text-[#050505] s ">
              <input
                id="title"
                dir="auto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                disabled={!loggedIn}
                className="w-full flex-1 rounded-md bg-gray-50 p-2 pl-5 mb-2 outline-none"
                type="text"
                placeholder={"Title"}
              />
            </div>
            <div className="text-[#050505 ] font-[400]">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
                error={formik.touched.body && Boolean(formik.errors.body)}
                placeholder="Text (optional)"
                variant="soft"
                disabled={!loggedIn}
                className=" flex-1 m-2 p-2 bg-gray-50 !outline-none !border-none rounded-md resize-none "
                endDecorator={
                  <Typography className="text-xs ml-auto text-gray-500">
                    {300 - formik.values.body.length} character(s)
                  </Typography>
                }
              />
            </div>
            <div className="flex justify-end items-center gap-2 font-semibold">
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
      <footer className="flex items-center justify-around mt-3 pt-1 text-gray-400 border-t-[1px] ">
        <div
          className={`postButtons ${postLiked ? "text-blue-600" : ""}`}
          onClick={() => {
            loggedIn
              ? likePostHandler(post._id)
              : toast.error("Please sign in to like");
          }}
        >
          <BiLike />
          <p>Like</p>
        </div>

        <Link href={`/post/${post._id}`}>
          <div className="postButtons">
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
    <div className=" bg-white mt-2 pt-3 pb-1 px-6 rounded-md shadow-sm">
      {Header()}
      {Body()}
      {Footer()}
    </div>
  );
};

export default Post;
