import React, { useState } from "react";
import { communityItem } from "../../../types/communityItem";
import ItemCardModal from "../../../UI/modals/ItemCardModal";

type itemCardProps = {
  item: communityItem;
};

function ItemCard({ item }: itemCardProps) {
  const [Modal, setModal] = useState(false);
  const {
    mainImage,
    company,
    brand,
    name,
    bestBatch: { price: bestBatchPrice },
    cheapestBatch: { price: cheapestBatchPrice },
  } = item;

  return (
    <div className="w-[50%] sm:max-w-[33%] lg:max-w-[25%]">
      <ItemCardModal modalOpen={Modal} setModalOpen={setModal} item={item} />
      <div className="flex flex-col rounded-md m-5">
        <div
          className="flex flex-col justify-center cursor-pointer"
          onClick={() => setModal(true)}
        >
          <img src={mainImage} className="object-contain max-h-32 h-20 md:h-28 lg:h-32" />
          <p className="text-sm md:text-[sm] mb-1 mt-2 md:mt-5 flex justify-center uppercase font-semibold text-center">
            {company}
          </p>

          <p className="text-xs md:text-xl text-center">{brand}</p>
        </div>
        <div className="w-full flex justify-center mt-1">
          <p className="text-xs md:text-base font-bold">
            {cheapestBatchPrice ? `${cheapestBatchPrice}¥ - ` : " "}
            {bestBatchPrice}¥
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
