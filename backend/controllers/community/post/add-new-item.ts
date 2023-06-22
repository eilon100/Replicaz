import { RequestHandler } from 'express';
import CommunityItem from '../../../db/modal/communityItems';
import {
  imagesFolderDeletion,
  imagesUpload,
} from '../../../utills/cloudinaryActions';

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
