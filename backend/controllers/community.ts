import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import CommunityItem from '../db/modal/communityItems';
import {
  imagesFolderDeletion,
  imagesUpload,
} from '../utills/cloudinaryActions';

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
    const [existsItem] = await CommunityItem.find({ name, brand });

    if (existsItem) {
      return res.status(300).json({ error: 'This item name already exists' });
    }

    const imageArr = await imagesUpload(
      images,
      `/items/${company}/${brand}/${name}`
    );

    const currentItem = new CommunityItem({
      community,
      company,
      brand,
      name,
      sizeType,
      color,
      mainImage: imageArr![0] || '',
      images: imageArr,
      bestBatch,
      cheapestBatch,
      description,
    });

    await currentItem.save();
    return res.status(201).json({ message: 'New item added!' });
  } catch (err) {
    await imagesFolderDeletion(`/items/${company}/${brand}/${name}`);
    return res
      .status(400)
      .json({ error: "Error on '/community/addnewitem': " + err });
  }
};

export const getAllItems: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const { currentPage, sortSelect, colorSelect, companySelect } = req.query;

  const filterObj = {
    community: currentPage,
    color: colorSelect === 'all' ? { $exists: true } : colorSelect,
    company: companySelect === 'all' ? { $exists: true } : companySelect,
  };
  const itemsNumber = await CommunityItem.countDocuments(filterObj);
  const itemsBrands = await CommunityItem.find({
    community: currentPage,
    company: companySelect === 'all' ? { $exists: true } : companySelect,
  }).distinct('brand');

  const itemsPerPAge = 12;
  try {
    const items = await CommunityItem.find(filterObj)
      .sort({ _id: -1 })
      .skip(page * itemsPerPAge)
      .limit(itemsPerPAge);

    return res.status(200).send({ items, itemsNumber });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch the items' });
  }
};
export const getItemsData: RequestHandler = async (req, res, next) => {
  const { page } = req.params;
  try {
    const itemsColors = await CommunityItem.distinct('color', {
      community: page,
    });
    const itemsCompanies = await CommunityItem.distinct('company', {
      community: page,
    });

    return res.status(201).json({ itemsColors, itemsCompanies });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Error on '/community/addnewitem': " + err });
  }
};
