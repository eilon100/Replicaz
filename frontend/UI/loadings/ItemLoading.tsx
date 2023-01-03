import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function ItemLoading() {
  return (
    <div className="w-[50%] sm:max-w-[33%] lg:max-w-[25%] m-3 px-3 max-w-4xl mx-auto ">
      <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <div className="w-full flex justify-center">
            <Skeleton
              animation="wave"
              height={10}
              width="60%"
              className="mb-1"
            />
          </div>
          <Skeleton animation="wave" height={10}  className="mb-1" />
          <div className="w-full flex justify-center">
            <Skeleton
              animation="wave"
              height={10}
              width="20%"
              className="mb-1"
            />
          </div>
        </React.Fragment>
      </CardContent>
    </div>
  );
}
export default ItemLoading;
