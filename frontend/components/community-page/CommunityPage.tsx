import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Feed from "../../components/Feed/Feed";
import PostBox from "../../components/PostBox/PostBox";
import { communityPages } from "../../types/currentPage";
import UploadItemModal from "../../UI/modals/UploadItemModal";
import { communityData } from "../../utills/data/communityPageData";
import AllItems from "./componnents/AllItems";
import ItemCard from "./componnents/ItemCard";

function CommunityPage({ page }: communityPages) {
  const [currentPage, setCurrentPage] = useState("posts");
  const [Modal, setModal] = useState(false);
  const {
    [page]: { backgroundImage, mainImage, items },
  } = communityData;

  const header = () => {
    return (
      <div className=" bg-white">
        <img
          src={backgroundImage}
          alt="Shoes"
          className=" object-cover w-full h-28 sm:h-48"
        />
        <div className="px-4">
          <div className="mx-auto  flex max-w-5xl items-center space-x-4 pb-3 border-b mb-3">
            <div className="-mt-4 h-20 w-20 sm:h-32 sm:w-32 bg-white rounded-full p-1 ">
              <img
                src={mainImage}
                alt="Shoes"
                className="rounded-full object-cover h-full w-full"
              />
            </div>
            <div className="py-2">
              <h1 className="text-base sm:text-4xl font-semibold">
                Welcome to {page} page
              </h1>
              <p className="text-xs sm:text-base text-text-second">r/{page}</p>
            </div>
          </div>
          <div className="mx-auto flex max-w-5xl items-center gap-3 text-sm">
            <span
              className={` px-2 py-1 ${
                currentPage === "posts"
                  ? "font-semibold border-b-4"
                  : " mb-1 cursor-pointer"
              }`}
              onClick={() => {
                setCurrentPage("posts");
              }}
            >
              Posts
            </span>
            <span
              className={`px-2 py-1 ${
                currentPage === page
                  ? "font-semibold border-b-4"
                  : " mb-1 cursor-pointer"
              }`}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <UploadItemModal modalOpen={Modal} setModalOpen={setModal} page={page} />
      {header()}
      <div className="pb-10 mt-6">
        {currentPage === "posts" ? (
          <div className="my-6 px-3 max-w-4xl mx-auto">
            <PostBox currentPage={page} />
            <Feed currentPage={page} />
          </div>
        ) : (
          <div className="mx-3">
            <p
              className="mx-auto cursor-pointer w-full flex justify-center"
              onClick={() => setModal(true)}
            >
              upload item
            </p>
            <div className="max-w-6xl mx-auto flex flex-wrap bg-white pt-5 p-3 rounded-md">
              <AllItems currentPage={page} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityPage;
