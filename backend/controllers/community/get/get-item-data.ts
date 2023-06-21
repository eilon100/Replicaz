import { RequestHandler } from "express";
import CommunityItem from "../../../db/modal/communityItems";

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
