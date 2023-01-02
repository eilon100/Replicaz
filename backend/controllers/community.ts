import { RequestHandler } from "express";
import mongoose from "mongoose";
import newItem from "../modal/communityItems";
import {
  imagesFolderDeletion,
  imagesUpload,
} from "../utills/cloudinaryActions";

export const addNewItem: RequestHandler = async (req, res, next) => {
  const {
    community,
    company,
    brand,
    name,
    sizeType,
    color,
    images,
    bestBatch,
    cheapestBatch,
    description,
  } = req.body;

  try {
    const [existsItem] = await newItem.find({ name, brand });

    if (existsItem) {
      return res.status(300).json({ error: "This item name already exists" });
    }

    const imageArr = await imagesUpload(
      images,
      `/items/${company}/${brand}/${name}`
    );

    const currentItem = new newItem({
      community,
      company,
      brand,
      name,
      sizeType,
      color,
      mainImage: imageArr![0] || "",
      images: imageArr,
      bestBatch,
      cheapestBatch,
      description,
    });

    await currentItem.save();
    return res.status(201).json({ message: "New item added!" });
  } catch (err) {
    await imagesFolderDeletion(`/items/${company}/${brand}/${name}`);
    return res
      .status(400)
      .json({ error: "Error on '/community/addnewitem': " + err });
  }
};

export const getAllItems: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const { currentPage } = req.query;
  const itemsPerPAge = 8;

  newItem
    .find({ community: currentPage })
    .sort({ _id: -1 })
    .skip(page * itemsPerPAge)
    .limit(itemsPerPAge)
    .then((items) => {
      return res.status(200).send(items);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Could not fetch the items" });
    });
};
