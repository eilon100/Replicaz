import { communityPages } from "./currentPage";

export type communityItem = {
  bestBatch: {
    name: string;
    price: number | null;
    url: string;
    _id: string;
  };
  brand: string;
  cheapestBatch: {
    name: string;
    price: number | null;
    url: string;
    _id: string;
  };
  color: string;
  community: communityPages;
  company: string;
  description: string;
  images: string[];
  mainImage: string;
  name: string;
  sizeType: string;
  _id: string;
};
