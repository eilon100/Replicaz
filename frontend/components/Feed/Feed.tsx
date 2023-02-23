import React, { useRef, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import PostLoading from "../../UI/loadings/PostLoading";
import { apiService } from "../../utills/apiService";
import { currentPage } from "../../types/currentPage";
import { post } from "../../types/post";
import { scrollIntoPostPosition } from "../../utills/scrollIntoPostPosition";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../utills/useIntersectionObserver";
import { useRouter } from "next/dist/client/router";

type FeedProps = {
  currentPage: currentPage;
  options?: any;
};
function Feed({ currentPage, options }: FeedProps) {
  const {
    query: { search },
  } = useRouter();

  const fetchPosts = async ({ pageParam = 0 }: any) => {
    const isUserPage = currentPage === "user";
    const isSavedPosts = options?.type === "saved";

    if (isSavedPosts) {
      const res = await apiService.get.GET_USER_SAVED_POSTS({
        pageParam,
      });
      return res;
    }

    if (isUserPage) {
      const res = await apiService.get.GET_USER_POSTS({
        pageParam,
        options,
      });
      return res;
    }

    const res = await apiService.get.GET_ALL_POSTS({
      pageParam,
      currentPage,
      search,
    });
    return res;
  };

  const {
    data: { pages } = {},
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["posts", { currentPage, options, search }],
    (queryFunctionContext) => fetchPosts(queryFunctionContext),
    {
      getNextPageParam: (_lastPage, currentPage) => {
        const isLastPage = !currentPage[currentPage.length - 1]?.data[0];
        if (isLastPage) {
          return undefined;
        }
        return currentPage.length;
      },
    }
  );

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

  if (isLoading) {
    return (
      <>
        {Array(8)
          .fill(0)
          .map((_, i) => {
            return <PostLoading key={i} />;
          })}
      </>
    );
  }

  if (isError) {
    return <h1>Could not fetch the posts </h1>;
  }

  return (
    <>
      {pages?.map((page, pageNumber) => (
        <React.Fragment key={pageNumber}>
          {page?.data.map((post: post) => (
            <div ref={persistedId === post._id ? postRef : null} key={post._id}>
              <Post post={post} page={currentPage} />
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
            {search && pages && pages[0].data.length === 0 ? (
              <p>No results for {search}</p>
            ) : (
              <p>No posts..</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Feed;
