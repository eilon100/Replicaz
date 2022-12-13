import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { post } from "../types/post";
import PostLoading from "../UI/loadings/PostLoading";
import { apiService } from "../utills/apiService";
import { scrollIntoPostPosition } from "../utills/scrollIntoPostPosition";
import useIntersectionObserver from "../utills/useIntersectionObserver";
import Post from "./Post";

function Feed() {
  const fetchPosts = async ({ pageParam = 0 }) =>
    await apiService.get.GET_ALLPOSTS(pageParam);

  const {
    data: { pages } = {},
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery(["posts"], fetchPosts, {
    getNextPageParam: (_lastPage, currentPage) => {
      const isLastPage = !currentPage[currentPage.length - 1].data[0];
      if (isLastPage) {
        return undefined;
      }
      return currentPage.length;
    },
  });
  let persistedId: string | null = "";
  const loadMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const postRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  if (typeof window !== "undefined") {
    persistedId = sessionStorage.getItem("scroll-position-post-id-marker");
  }

  scrollIntoPostPosition(postRef);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    status,
  });

  if (status === "loading") {
    return Array(8)
      .fill(0)
      .map((_, i) => {
        return <PostLoading key={i} />;
      });
  }

  if (status === "error") {
    return <p>Could not fetch the posts</p>;
  }

  if (status === "success") {
    return (
      <>
        {pages?.map((page, pageNumber) => (
          <React.Fragment key={pageNumber}>
            {page.data.map((post: post) => (
              <div
                ref={persistedId === post._id ? postRef : null}
                key={post._id}
              >
                <Post post={post} />
              </div>
            ))}
          </React.Fragment>
        ))}
        <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
          {isFetchingNextPage ? (
            <div className="w-full flex justify-center my-4 ">
              <CircularProgress className="text-text-second " />
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {!hasNextPage && (
            <div className="w-full flex justify-center my-4 ">
              <p>No more posts..</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Feed;
