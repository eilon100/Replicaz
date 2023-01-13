import React, { useRef, useState, useEffect } from "react";
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
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/system";

type AllItemsProps = {
  currentPage: currentPage;
  itemsData: any;
};

function AllItems({ currentPage, itemsData }: AllItemsProps) {
  const [sortSelect, setSortSelect] = useState("all");
  const [colorSelect, setColorSelect] = useState("all");
  const [companySelect, setCompanySelect] = useState("all");
  const [openDrawer, setOpenDrawer] = useState(false);
  const { itemsNumber, itemsColors, itemsCompanies } = itemsData;

  const fetchItems = async ({
    pageParam = 0,
    queryKey: [, queryData],
  }: any) => {
    const data = {
      pageParam,
      ...queryData,
    };

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
  } = useInfiniteQuery(
    ["items", { currentPage, sortSelect, colorSelect, companySelect }],
    (queryFunctionContext) => fetchItems(queryFunctionContext),
    {
      getNextPageParam: (_lastPage, currentPage) => {
        const isLastPage = !currentPage[currentPage.length - 1]?.data?.items[0];

        if (isLastPage) {
          return undefined;
        }
        return currentPage.length;
      },
    }
  );

  const loadMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    status,
  });

  const header = () => {
    return (
      <div className="w-full mx-5 flex flex-col sm:flex-row justify-between items-center my-2">
        <div className="flex flex-col w-full sm:flex-row sm:w-fit  text-sm p-2 sm:gap-4">
          <div className=" flex flex-col sm:flex-row items-center sm:gap-2">
            <p className="font-bold">Company</p>
            <FormControl variant="standard" className="m-1 w-full">
              <Select
                className="capitalize text-sm w-full min-w-[110px]"
                value={companySelect}
                onChange={(event) => {
                  setCompanySelect(event.target.value);
                }}
              >
                <MenuItem value="all">All</MenuItem>
                {itemsCompanies.map((company: string) => {
                  return (
                    <MenuItem
                      value={company}
                      className="capitalize"
                      key={company}
                    >
                      {company}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:gap-2">
            <p className="font-bold">Color</p>
            <FormControl
              variant="standard"
              className="m-1 w-full min-w-[110px]"
            >
              <Select
                className="capitalize text-sm"
                value={colorSelect}
                onChange={(event) => {
                  setColorSelect(event.target.value);
                }}
              >
                {itemsColors.map((color: string) => {
                  return (
                    <MenuItem value={color} className="capitalize" key={color}>
                      {color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="p-2 ">
          Total of:{" "}
          <span className="font-bold">
            {pages ? pages[0]?.data?.itemsNumber : ""}
          </span>{" "}
          {currentPage}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <>
        {header()}
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
      {header()}
      {pages?.map(({ data: { items } }, pageNumber) => (
        <React.Fragment key={pageNumber}>
          {items?.map((item: communityItem) => (
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
