import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { PlusIcon, UploadIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

function UploadPhotos(props: any) {

  const [images, setImages] = useState<any[]>([]);
  const [imageURL, setImageURL] = useState<string[]>([]);

  useEffect(() => {
    if (images.length > props.imageLength) {
      toast.error("Please upload 5 photos only");
      return;
    }

    const imagesURLArr = images.reduce(
      (newImageURLs: string[], image: File) => {
        newImageURLs.push(URL.createObjectURL(image));
        return newImageURLs;
      },
      []
    );

    const imagesResultArr = images.reduce(
      (newImageResult: any[], image: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          newImageResult.push(reader.result);
        };
        return newImageResult;
      },
      []
    );

    setImageURL(imagesURLArr);
    props.setImages(imagesResultArr);
  }, [images]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [...files] = Array.from(e.target.files as ArrayLike<File>);
    if (files?.length > props.imageLength) {
      toast.error("Please upload 5 photos only");
    }

    setImages(files);
  };

  const onImageRemove = (imageSrc: string) => {
    let imagesArrClone: File[] = [...images];
    let index: number = imageURL.indexOf(imageSrc);
    if (index !== -1) {
      imagesArrClone.splice(index, 1);
      setImages(imagesArrClone);
    }
  };

  const onImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imagesArrClone: File[] = [...images];
    const newUploadedFiles = Array.from(e.target.files as ArrayLike<File>);

    if (newUploadedFiles.length + images.length <= props.imageLength) {
      imagesArrClone.push(...newUploadedFiles);
      setImages(imagesArrClone);
    } else {
      toast.error("Please upload 5 photos only");
    }
  };

  const uploadImageZone = () => {
    return (
      imageURL.length === 0 && (
        <label htmlFor="upload">
          <div className="flex flex-col items-center text-gray-400 cursor-pointer">
            <UploadIcon className="w-7 h-7" />
            <p className="hidden xs:flex">
              Drag and drop images, or click to select files
            </p>
            <p className="flex xs:hidden">Upload files</p>
          </div>
          <input
            hidden
            id="upload"
            type="file"
            accept="image/*"
            multiple
            onChange={onImageChange}
          />
        </label>
      )
    );
  };

  const previewImage = () => {
    return imageURL.map((imageSrc, index) => (
      <div key={index} className="relative flex-shrink-0">
        <XIcon
          className="h-4 w-4 xs:h-5 xs:w-5 p-[2px] absolute left-[72%] 
      xs:left-[76%] top-[6%] xs:top-[5%] bg-[#e1e1e1] bg-opacity-50
       rounded-full text-[#6d6d6d] cursor-pointer hover:bg-[#d1d1d1] "
          onClick={() => onImageRemove(imageSrc)}
        />
        <img
          className="h-20 w-20 mx-1 border rounded-xl p-[1px] xs:h-28 xs:w-28  "
          src={imageSrc}
        />
      </div>
    ));
  };
  
  const addPhotos = () => {
    return (
      imageURL.length > 0 &&
      images.length < 5 && (
        <div>
          <label htmlFor="input" className="cursor-pointer ">
            <PlusIcon
              className="h-20 xs:h-28 mx-1 p-6 xs:p-9 
                  border border-dashed  rounded-md text-gray-300
                   hover:text-gray-500 hover:border-gray-500  "
            />
          </label>
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            id="input"
            onChange={onImageAdd}
          />
        </div>
      )
    );
  };

  return (
    <div
      className={`overflow-x-auto flex ${
        imageURL.length == 0 ? "justify-center" : ""
      } items-center px-3 py-2 xs:py-5 ml-2 mr-2  border border-dashed `}
    >
      {uploadImageZone()}
      {previewImage()}
      {addPhotos()}
    </div>
  );
}

export default UploadPhotos;
