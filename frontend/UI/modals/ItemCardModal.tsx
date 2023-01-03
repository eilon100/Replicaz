import React, { useState } from "react";
import { Modal } from "@mui/joy";
import { MdContentCopy, MdClose } from "react-icons/md";
import ItemSwiper from "../../components/community-page/componnents/ItemSwiper";
import CopyToClipboard from "react-copy-to-clipboard";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { communityItem } from "../../types/communityItem";

interface itemCardModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: communityItem;
}

function ItemCardModal({ modalOpen, setModalOpen, item }: itemCardModalProps) {
  const [toolTip, setToolTip] = useState("Copy");
  const {
    description,
    company,
    images,
    name,
    brand,
    bestBatch: {
      name: bestBatchName,
      url: bestBatchUrl,
      price: bestBatchPrice,
    },
    cheapestBatch: {
      name: cheapestBatchName,
      url: cheapestBatchUrl,
      price: cheapestBatchPrice,
    },
    sizeType,
  } = item;

  const batches = () => {
    return (
      <div>
        <div className="flex flex-col gap-2">
          <p>
            Best batch:
            <span className="font-normal"> {bestBatchName}</span>
          </p>
          <p>
            Price:
            <span className="font-normal"> {bestBatchPrice} ¥</span>
          </p>
          <div className="flex w-full items-center relative px-2  mb-2 border border-black rounded-md">
            <input
              readOnly
              className="w-full py-2 mr-2 text-xs text-[#555] border-none outline-none"
              value={bestBatchUrl}
            />

            <CopyToClipboard text={`${bestBatchUrl}`}>
              <Tooltip
                title={toolTip}
                onClose={() => {
                  setToolTip("Copy");
                }}
                onClick={() => {
                  setToolTip("Copied!");
                }}
                TransitionComponent={Zoom}
              >
                <div>
                  <MdContentCopy className="z-100 cursor-pointer rounded text-2xl p-1 bg-neutral-300" />
                </div>
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
        {cheapestBatchUrl ? (
          <div className="flex flex-col gap-2">
            <p>
              Cheapest batch:
              <span className="font-normal"> {cheapestBatchName}</span>
            </p>
            <p>
              Price:
              <span className="font-normal"> {cheapestBatchPrice} ¥</span>
            </p>
            <div className="flex w-full items-center relative px-2 mb-2 border border-black rounded-md">
              <input
                readOnly
                className="w-full py-2 mr-2 text-xs text-[#555] border-none outline-none"
                value={cheapestBatchUrl}
              />
              <CopyToClipboard text={`${cheapestBatchUrl}`}>
                <Tooltip
                  title={toolTip}
                  onClose={() => {
                    setToolTip("Copy");
                  }}
                  onClick={() => {
                    setToolTip("Copied!");
                  }}
                  TransitionComponent={Zoom}
                >
                  <div>
                    <MdContentCopy className="z-100 cursor-pointer rounded text-2xl p-1 bg-neutral-300" />
                  </div>
                </Tooltip>
              </CopyToClipboard>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="flex justify-center items-center bg-rgba(0,0,0,0.3) mx-5 z-50 "
    >
      <div className="flex flex-col w-full max-w-[100rem] p-3 bg-main rounded-md shadow-sm border">
        <div className="w-full flex justify-end ">
          <MdClose
            className="text-gray-400 text-2xl  cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="py-10 flex flex-col items-center md:flex-row justify-around mb-2">
          <div className="text-center md:hidden">
            <h1 className=" text-lg xs:text-2xl  font-bold ">{company}</h1>
            <h1 className=" text-base xs:text-lg font-bold ">
              {brand} {name}
            </h1>
          </div>
          <div className=" w-3/4 xs:w-1/2 h-full my-1">
            <ItemSwiper images={images} />
          </div>
          <div className="  flex flex-col gap-1 mx-5 font-semibold text-xs xs:text-base lg:text-base md:text-sm md:gap-3">
            <div className="hidden md:flex flex-col">
              <h1 className="text-base lg:mb-2 md:text-2xl lg:text-4xl xl:text-6xl font-bold capitalize">
                {company}
              </h1>
              <h1 className=" text-base lg:mb-10 md:text-lg lg:text-2xl xl:text-3xl font-semibold ">
                {brand} {name}
              </h1>
            </div>
            <p>
              Prices:
              <span className="font-normal">
                {cheapestBatchPrice
                  ? ` ${cheapestBatchPrice}¥ -
                `
                  : " "}
                {bestBatchPrice}¥
              </span>
            </p>
            <p>
              Size: <span className="font-normal"> {sizeType}</span>
            </p>
            {batches()}
            <p className="flex flex-col">
              Recommendations:
              <span className="font-normal"> {description}</span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ItemCardModal;
