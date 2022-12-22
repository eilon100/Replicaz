import React, { useState } from "react";
import ItemCardModal from "../../../UI/modals/ItemCardModal";

function ItemCard({ item }: any) {
  const [Modal, setModal] = useState(false);
  const {
    mainImage,
    brand,
    name,
    bestBatch: { price: bestBatchPrice },
    cheapestBatch: { price: cheapestBatchPrice },
  } = item;
  return (
    <div className="max-w-[50%] xs:w-[33%] sm:max-w-[25%] ">
      <ItemCardModal modalOpen={Modal} setModalOpen={setModal} item={item} />
      <div className="flex flex-col rounded-md border border-black m-2 pb-4 px-3">
        <div
          className="flex flex-col justify-center cursor-pointer"
          onClick={() => setModal(true)}
        >
          <img src={mainImage} className="object-contain h-28 " />
          <p className="text-xs md:text-base flex justify-center">{brand}</p>
          <p className="text-xs md:text-base flex justify-center">{name}</p>
        </div>
        <div className="w-full flex justify-center">
          <p className="text-xs md:text-base font-bold">
            {cheapestBatchPrice}¥ - {bestBatchPrice}¥
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
