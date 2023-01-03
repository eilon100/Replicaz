import React, { useRef } from "react";
import { CircularProgress } from "@mui/joy";
import ItemCard from "./ItemCard";
import { apiService } from "../../../utills/apiService";
import { currentPage } from "../../../types/currentPage";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../../../utills/useIntersectionObserver";
import { communityItem } from "../../../types/communityItem";
import ItemLoading from "../../../UI/loadings/ItemLoading";
import { FormControl, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";

type AllItemsProps = {
  currentPage: currentPage;
};

function AllItems({ currentPage }: AllItemsProps) {
  const [sortSelectState, setSortSelectState] = React.useState("All");
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

  const ColorSelect = () => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
        <Select
          value={sortSelectState}
          onChange={(event) => {
            setSortSelectState(event.target.value);
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Lowest first">Lowest first</MenuItem>
          <MenuItem value="Highest first">Highest first</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const CompanySelect = () => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
        <Select
          value={sortSelectState}
          onChange={(event) => {
            setSortSelectState(event.target.value);
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Lowest first">Lowest first</MenuItem>
          <MenuItem value="Highest first">Highest first</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const SortSelect = () => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
        <Select
          value={sortSelectState}
          onChange={(event) => {
            setSortSelectState(event.target.value);
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Lowest first">Lowest first</MenuItem>
          <MenuItem value="Highest first">Highest first</MenuItem>
        </Select>
      </FormControl>
    );
  };

  if (isLoading) {
    return (
      <>
        {Array(16)
          .fill(0)
          .map((_, i) => {
            return <ItemLoading key={i} />;
          })}
      </>
    );
  }

  if (isError) {
    return <h1>Could not fetch the {currentPage} </h1>;
  }
  return (
    <>
      <div className="w-full mx-10 flex justify-between items-center">
        <div className="flex">
          <div className="p-2 flex items-center">
            <p className=" ">Sort By:</p>
            {SortSelect()}
          </div>
          <div className="p-2 flex items-center">
            <p className=" ">Color:</p>
            {ColorSelect()}
          </div>
          <div className="p-2 flex items-center">
            <p className=" ">Company:</p>
            {CompanySelect()}
          </div>
        </div>
        <div className="p-2">
          Total of: ${} {currentPage}
        </div>
      </div>
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
