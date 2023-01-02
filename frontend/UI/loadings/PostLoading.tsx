import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function PostLoading() {
  return (
    <Card className="my-3 px-3 max-w-4xl mx-auto ">
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="80%" />}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            style={{ marginBottom: 6 }}
          />
        }
      />

      <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}
export default PostLoading;
