import React from "react";
import { useInfiniteQuery } from "react-query";
import { post } from "../types/post";
import { apiService } from "../utills/apiService";
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
  } = useInfiniteQuery(["posts"], fetchPosts, {
    getNextPageParam: (_lastPage, currentPage) => {
      const isLastPage = !currentPage[currentPage.length - 1].data[0];
      if (isLastPage) {
        return undefined;
      }
      return currentPage.length;
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
      {pages?.map((page, i) => (
        <React.Fragment key={i}>
          {page.data.map((post: post) => (
            <Post post={post} key={post._id} />
          ))}
        </React.Fragment>
      ))}

      {loadingButton()}
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export default Feed;
