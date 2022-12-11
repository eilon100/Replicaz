import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function SinglePostLoading() {
  return (
    <div className="my-6 px-3 max-w-4xl mx-auto">
      <Card className="p-2">
        <header>
          <div className="flex items-center mb-2">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
            <Skeleton
              animation="wave"
              height={10}
              width="20%"
              style={{ marginBottom: 6, marginLeft: 10 }}
            />
          </div>
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            sx={{ marginBottom: 1 }}
          />
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            sx={{ marginBottom: 1 }}
          />
        </header>

        <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />

        <CardContent style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="flex justify-between mb-2">
            <Skeleton animation="wave" height={10} width="10%" />
            <Skeleton animation="wave" height={10} width="10%" />
          </div>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        </CardContent>
        {Array(3)
          .fill(0)
          .map((number, i) => {
            return (
              <div key={i}>
                <Skeleton
                  animation="wave"
                  height={10}
                  width="40%"
                  sx={{ marginBottom: 1 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  sx={{ marginBottom: 5 }}
                />
              </div>
            );
          })}
      </Card>
    </div>
  );
}

export default SinglePostLoading;
