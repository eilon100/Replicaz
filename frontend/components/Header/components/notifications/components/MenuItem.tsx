import React from "react";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { apiService } from "../../../../../utills/apiService";
import { GoPrimitiveDot } from "react-icons/go";
function MenuItemContainer({
  notifications: {
    sentUserId: { userName, image },
    seen,
    postId: { title, _id: postId },
    type,
    _id: notificationId,
  },
}: any) {
  const router = useRouter();

  const notificationText =
    type === "like"
      ? "liked your"
      : type === "comment"
      ? "commented on your "
      : type === "commentLike"
      ? "like your comment on"
      : "";

  const notificationHandler = () => {
    router.push(`/post/${postId}`);
    const data = { notificationId };

    apiService.patch.MAKE_NOTIFICATION_SEEN(data).then();
  };

  return (
    <MenuItem
      style={{ whiteSpace: "normal" }}
      onClick={() => notificationHandler()}
      className={`${!seen ? " bg-sky-50" : ""} h-20`}
    >
      <div className="flex items-center gap-4 w-full">
        <div className=" relative h-14 w-14 ">
          <Image
            className="rounded-full "
            objectFit="cover"
            src={image}
            layout="fill"
          />
        </div>
        <h1 className={`max-w-[calc(100%-${seen ? "76px" : "110px"})] w-full`}>
          {userName} {notificationText}
          <span className=" font-semibold"> {title} </span>
          post
        </h1>
        {!seen && <GoPrimitiveDot className=" text-blue-500 text-xl" />}
      </div>
    </MenuItem>
  );
}

export default MenuItemContainer;
