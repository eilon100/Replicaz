import { RequestHandler } from "express";
import CommunityItem from "../../../db/modal/communityItems";

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
