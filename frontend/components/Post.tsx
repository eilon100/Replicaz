import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import {
  BiComment,
  BiDotsHorizontalRounded,
  BiLike,
  BiShare,
} from "react-icons/bi";
import ReactTimeago from "react-timeago";
import { apiService } from "../utills/apiService";
import ImageSwiper from "./post-components/ImageSwiper";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PostEdit from "./drop-down/PostEdit";

function Post({ post }: any) {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const { loggedIn, userId } = state;
  const [postLiked, setPostLiked] = useState(post.likes.includes(userId));
  const [postLikedCount, setPostLikedCount] = useState(0);

  const likePostHandler = (id: string) => {
    const postId = JSON.stringify({ postId: id });
    apiService.post
      .LIKE_POST(postId)
      .then((res) => {
        res.data.like
          ? (setPostLiked(true), setPostLikedCount(postLikedCount + 1))
          : (setPostLiked(false), setPostLikedCount(postLikedCount - 1));
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
        <PostEdit postId={post._id} userPost={post.postedBy._id === userId} />
      </header>
    );
  };
  const Body = () => {
    return (
      <>
        <div className=" font-semibold text-[#050505] text-2xl ">
          <h1>{post?.title}</h1>
        </div>
        <div className="text-[#050505 ] font-[400]">
          <p>{post?.body}</p>
        </div>
        <div className="mt-4">
          <ImageSwiper arr={post?.images} />
        </div>
        <div className="flex justify-between items-center mt-4 text-[#65676B] text-xs md:text-sm">
          <div>{post.likes.length + postLikedCount} Likes</div>
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
        <div
          className="postButtons"
          onClick={() => router.push(`/post/${post._id}`)}
        >
          <BiComment className="mt-[2px]" />
          <p>Comment</p>
        </div>
        <div className="postButtons">
          <BiShare />
          <p>Share</p>
        </div>
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
}

export default Post;
