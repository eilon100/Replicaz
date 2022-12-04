import { useRouter } from "next/router";
import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { post } from "../types/post";
import { apiService } from "../utills/apiService";
import Post from "./Post";

function Feed() {
  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await apiService.get.GET_ALLPOSTS(pageParam);
    return res;
  };
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState("");

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
        return pages.length;
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
          {group.data.map((post: post, i: number) => (
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
