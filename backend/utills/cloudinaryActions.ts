import { Types } from "mongoose";
import cloudinary from "./cloudinary";

export const imagesUpload = async (images: any[], path: string) => {
  if (!images || images.length < 0) return [];
  try {
    const imagesUrl: any[] = [];

    const uploadImages = images.map(async (img, i) => {
      const upload = cloudinary.uploader
        .upload(img, {
          folder: path,
        })
        .then((res: any) => (imagesUrl[i] = res.secure_url));
      return upload;
    });
    await Promise.all(uploadImages);

    return imagesUrl;
  } catch (err) {
    console.log(err);
  }
};

export const imagesFolderDeletion = async (path: string) => {
  try {
    await cloudinary.api.delete_resources_by_prefix(path).then(() => {
      cloudinary.api.delete_folder(path);
    });
  } catch (err) {
    console.log(err);
  }
};
