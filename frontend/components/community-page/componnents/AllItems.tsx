import React, { useRef } from "react";

import { CircularProgress } from "@mui/joy";
import ItemCard from "./ItemCard";
import PostLoading from "../../../UI/loadings/PostLoading";
import { apiService } from "../../../utills/apiService";
import { currentPage } from "../../../types/currentPage";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../../utills/useIntersectionObserver";
import { communityItem } from "../../../types/communityItem";

type FeedProps = {
  currentPage: currentPage;
};
function AllItems({ currentPage }: FeedProps) {
  const fetchItems = async ({ pageParam = 0 }) => {
    const data = { pageParam, currentPage };
    const res = await apiService.get.GET_ALL_ITEMS(data);
    return res;
  };

  const {
    data: { pages } = {},
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery(["items"], fetchItems, {
    getNextPageParam: (_lastPage, currentPage) => {
      const isLastPage = !currentPage[currentPage.length - 1]?.data[0];
      if (isLastPage) {
        return undefined;
      }
      return currentPage.length;
    },
  });
  const loadMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    status,
  });

  if (isLoading) {
    return (
      <>
        {Array(6)
          .fill(0)
          .map((_, i) => {
            return <PostLoading key={i} />;
          })}
      </>
    );
  }

  if (isError) {
    return <h1>Could not fetch the {currentPage} </h1>;
  }
  return (
    <>
      {pages?.map((page, pageNumber) => (
        <React.Fragment key={pageNumber}>
          {page?.data.map((item: communityItem) => (
            <ItemCard item={item} key={item._id} />
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
    </>
  );
}

export default AllItems;
