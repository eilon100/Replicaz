import React, { useState, useEffect } from "react";

import AllItems from "./componnents/AllItems";
import Feed from "../../components/Feed/Feed";
import PostBox from "../../components/PostBox/PostBox";
import UploadItemModal from "../../UI/modals/UploadItemModal";
import { communityPages } from "../../types/currentPage";
const communityData = {
  shoes: {
    backgroundImage:
      "https://res.cloudinary.com/dcpuvkirc/image/upload/v1671619932/defualt%20images/shoes-page_bndubq.webp",
    mainImage:
      "https://res.cloudinary.com/dcpuvkirc/image/upload/v1671619941/defualt%20images/shoes-page-profile_r6mwbj.webp",
  },
  bags: {
    backgroundImage:
      "https://res.cloudinary.com/dcpuvkirc/image/upload/v1671619902/defualt%20images/louis_vuitton_uiz1zo.jpg",
    mainImage:
      "https://res.cloudinary.com/dcpuvkirc/image/upload/v1671619899/defualt%20images/Balenciaga-bag_mvzrul.jpg",
  },
  clothes: {
    backgroundImage:
      "https://res.cloudinary.com/dcpuvkirc/image/upload/v1671619954/defualt%20images/clothes-page_dozh9y.jpg",
    mainImage:
      "https://res.cloudinary.com/dcpuvkirc/image/upload/v1671619901/defualt%20images/12cfd520-bb1c-42fa-a5af-c914d71cd737_yjyd5f.jpg",
  },
};

interface communityPageProps {
  page: communityPages;
  itemsData: any;
}
function CommunityPage({ page, itemsData }: communityPageProps) {
  const [currentPage, setCurrentPage] = useState("posts");
  const [Modal, setModal] = useState(false);
  const {
    [page]: { backgroundImage, mainImage },
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
              } capitalize`}
              onClick={() => {
                setCurrentPage("posts");
              }}
            >
              posts
            </span>
            <span
              className={`px-2 py-1 ${
                currentPage !== "posts"
                  ? "font-semibold border-b-4"
                  : " mb-1 cursor-pointer"
              } capitalize`}
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
            <div className="max-w-[90rem] mx-auto flex flex-wrap bg-white pt-5 rounded-md">
              <AllItems currentPage={page} itemsData={itemsData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityPage;
