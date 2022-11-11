import cloudinary from "./cloudinary";

interface pathobj {
  postedBy: string;
  postTitle: any;
}

export const imagesUpload = async (images: any[], path: pathobj) => {
  if (!images || images.length < 0) return [];
  try {
    const imagesUrl: any[] = [];

    const uploadImages = images.map(async (img) => {
      const upload = cloudinary.uploader
        .upload(img, {
          folder: `posts/${path.postedBy}/${path.postTitle}`,
        })
        .then((res: any) => imagesUrl.push(res.secure_url));
      return upload;
    });
    await Promise.all(uploadImages);

    return imagesUrl;
  } catch (err) {
    console.log(err);
  }
};
export const imagesFolderDeletion = async (path: pathobj) => {
  try {
    await cloudinary.api
      .delete_resources_by_prefix(`posts/${path.postedBy}/${path.postTitle}`)
      .then(() => {
        cloudinary.api.delete_folder(
          `posts/${path.postedBy}/${path.postTitle}`
        );
      });
  } catch (err) {
    console.log(err);
  }
};
