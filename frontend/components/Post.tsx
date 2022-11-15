import Image from "next/image";
import Router, { useRouter } from "next/router";
import React from "react";
import {
  BiComment,
  BiDotsHorizontalRounded,
  BiLike,
  BiShare,
} from "react-icons/bi";
import ReactTimeago from "react-timeago";
import ImageSwiper from "./post-components/ImageSwiper";

function Post({ post }: any) {
  const router = useRouter();

  return (
    <div className=" bg-white mt-2 pt-3 pb-1 px-6 rounded-md shadow-sm">
      <header className=" flex items-center mb-2 justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <Image
              className=" rounded-full "
              objectFit="contain"
              src={post.postedBy?.image}
              layout="fill"
            />
          </div>
          <div className="font-bold text-md">{post.community}</div>
          <div className=" font-[400] text-xs text-[#65676B]">
            - Posted by {post.postedBy?.userName}&nbsp;
            <ReactTimeago date={post.createdAt} />
          </div>
        </div>
        <BiDotsHorizontalRounded className="rounded-full p-1 w-6 h-6 hover:bg-gray-100 cursor-pointer" />
      </header>
      <div className=" font-semibold text-[#050505] text-2xl ">
        <h1>{post?.title}</h1>
      </div>
      <div className="text-[#050505 ] font-[400]">
        <p>{post?.body}</p>
      </div>
      <div className=" mt-4   ">
        <ImageSwiper arr={post?.images} />
      </div>
      <div className="flex justify-between items-center mt-4 text-[#65676B] text-xs md:text-sm">
        <div>{post.likes.length} Likes</div>
        <div>{post.comments.length} Comments</div>
      </div>
      <footer className="flex items-center justify-around mt-3 pt-1 text-gray-400 border-t-[1px] ">
        <div className="postButtons">
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
    </div>
  );
}

export default Post;
