import { useEffect } from "react";

export const scrollIntoPostPosition = (
  postRef: React.MutableRefObject<HTMLDivElement>
) => {
  useEffect(() => {
    postRef?.current?.scrollIntoView({
      block: "center",
    });
    sessionStorage.removeItem("scroll-position-post-id-marker");
  }, []);
};
