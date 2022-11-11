import Image from "next/image";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { apiService } from "../utills/apiService";
import {
  BiLike,
  BiComment,
  BiShare,
  BiBookmark,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import ImageSwiper from "./feed-components/ImageSwiper";

function Feed() {
  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await apiService.get.GET_ALLPOSTS(pageParam);
    return res;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["posts"], fetchPosts, {
    getNextPageParam: (_lastPage, pages) => {
      if (!pages[pages.length - 1].data[0]) {
        return undefined;
      } else {
        return pages.length + 1;
      }
    },
  });

  const loadingButton = () => {
    return (
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    );
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p></p>
  ) : (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((post: any, i: number) => (
            <div key={i} className=" bg-white mt-2 py-3 px-6 rounded-sm">
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
                    - Posted by {post.postedBy?.name}
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

              <footer className="flex items-center justify-center mt-5 text-gray-400">
                <div className="postButtons">
                  <BiLike />
                  <p>{post.likes.length} Like</p>
                </div>
                <div className="postButtons">
                  <BiComment className="mt-[2px]" />
                  <p>{post.comments.length} Comments</p>
                </div>
                <div className="postButtons">
                  <BiShare />
                  <p>Share</p>
                </div>
                <div className="postButtons">
                  <BiBookmark />
                  <p>Save</p>
                </div>
              </footer>
            </div>
          ))}
        </React.Fragment>
      ))}

      {loadingButton()}
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export default Feed;
