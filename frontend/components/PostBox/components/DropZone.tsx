import { PlusIcon, UploadIcon, XIcon } from "@heroicons/react/outline";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};
type DropzoneComponent = {
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  maxImagesLength: number;
};
function DropzoneComponent({ setImages, maxImagesLength }: DropzoneComponent) {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const imagesResultArr = files.reduce(
      (newImageResult: (string | ArrayBuffer | null)[], image: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          newImageResult.push(reader.result);
        };
        return newImageResult;
      },
      []
    );
    setImages(imagesResultArr);
  }, [files]);

  const onDrop = (acceptedFiles: any) => {
    if (
      acceptedFiles.length > maxImagesLength ||
      acceptedFiles.length + files.length > maxImagesLength
    ) {
      toast.error("Please upload 5 photos only");
      return;
    }
    if (files?.length === 0) {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    } else {
      let filesArrClone: File[] = [...files];
      filesArrClone.push(
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFiles(filesArrClone);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  const onImageRemove = (filePreview: string) => {
    let filesArrClone: File[] = [...files];

    filesArrClone.map((file: any) => {
      if (file.preview === filePreview) {
        let index: number = filesArrClone.indexOf(file);
        filesArrClone.splice(index, 1);
        setFiles(filesArrClone);
      }
    });
  };

  const previewImage = () => {
    return files.map((file: any) => (
      <div key={file.preview} className="relative flex-shrink-0">
        <XIcon
          className="h-4 w-4 xs:h-5 xs:w-5 p-[2px] absolute left-[72%] 
      xs:left-[76%] top-[6%] xs:top-[5%] bg-[#e1e1e1] bg-opacity-50
       rounded-full text-[#6d6d6d] cursor-pointer hover:bg-[#d1d1d1] "
          onClick={() => onImageRemove(file.preview)}
        />
        <img
          className="h-20 w-20 mx-1 border rounded-xl p-[1px] xs:h-28 xs:w-28  "
          src={file.preview}
          alt={file.name}
        />
      </div>
    ));
  };
  
  const DropZone = () => {
    return files?.length === 0 ? (
      <div
        {...getRootProps({
          className: `flex flex-col items-center text-gray-400 px-3 py-2 xs:py-5 mx-2 cursor-pointer border border-dashed 
      ${isDragActive ? "border-[#2196f3]" : ""} 
      ${isDragAccept ? "border-[#00e676]" : ""}
      ${isDragReject ? "border-[#ff1744]" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        <UploadIcon className="w-7 h-7" />
        <p className="hidden xs:flex">
          Drag and drop images, or click to select files
        </p>{" "}
        <p className="flex xs:hidden">Upload files</p>
      </div>
    ) : (
      <div
        {...getRootProps({
          className: `flex flex-col items-center text-gray-400`,
        })}
      >
        <input {...getInputProps()} />
        <PlusIcon
          className={`h-20 xs:h-28 mx-1 p-6 xs:p-9 
            border border-dashed  rounded-md text-gray-300
             hover:text-gray-500 hover:border-gray-500 cursor-pointer 
             ${isDragActive ? "border-[#2196f3]" : ""} 
             ${isDragAccept ? "border-[#00e676]" : ""}
             ${isDragReject ? "border-[#ff1744]" : ""} `}
        />
      </div>
    );
  };

  return (
    <div
      className={`${
        files?.length !== 0
          ? "overflow-x-auto flex items-center px-3 py-2 xs:py-5 ml-2 mr-2  border border-dashed"
          : ""
      } `}
    >
      {previewImage()}
      {files.length !== maxImagesLength ? DropZone() : ""}
    </div>
  );
}

export default DropzoneComponent;
