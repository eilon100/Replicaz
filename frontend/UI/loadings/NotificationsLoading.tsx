import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

function NotificationsLoading() {
  return (
    <div className="flex items-center p-2 gap-4 w-full">
      <Skeleton animation="wave" variant="circular" width={56} height={56} />
      <div className="max-w-[calc(100%-76px)] w-full">
        <Skeleton animation="wave" height={10} />
        <Skeleton animation="wave" height={10} width="20%" />
      </div>
    </div>
  );
}

export default NotificationsLoading;
