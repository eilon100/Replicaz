import React, { useState } from "react";
import { Modal, Textarea, Typography } from "@mui/joy";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { MenuItem, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import DropzoneComponent from "../../utills/DropZone";
import { itemValidationSchema } from "../../validation/communityItem";
import { toast } from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import { communityPages } from "../../types/currentPage";
interface uploadItemModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page: communityPages;
}

function UploadItemModal({
  modalOpen,
  setModalOpen,
  page,
}: uploadItemModalProps) {
  const [sizeType, setSizeType] = useState("");
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const {
    handleChange,
    handleBlur,
    values: {
      name: valuesName,
      description: valuesDescription,
      bestBatchName: valuesBestBatchName,
      bestBatchUrl: valuesBestBatchUrl,
      bestBatchPrice: valuesBestBatchPrice,
      cheapestBatchName: valuesCheapestBatchName,
      cheapestBatchUrl: valuesCheapestBatchUrl,
      cheapestBatchPrice: valuesCheapestBatchPrice,
    },
    touched: {
      name: touchedName,
      bestBatchName: touchedBestBatchName,
      bestBatchUrl: touchedBestBatchUrl,
      bestBatchPrice: touchedBestBatchPrice,
      cheapestBatchName: touchedCheapestBatchName,
      cheapestBatchUrl: touchedCheapestBatchUrl,
      cheapestBatchPrice: touchedCheapestBatchPrice,
    },
    errors: {
      name: errorsName,
      bestBatchName: errorsBestBatchName,
      bestBatchUrl: errorsBestBatchUrl,
      bestBatchPrice: errorsBestBatchPrice,
      cheapestBatchName: errorsCheapestBatchName,
      cheapestBatchUrl: errorsCheapestBatchUrl,
      cheapestBatchPrice: errorsCheapestBatchPrice,
    },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      bestBatchName: "",
      bestBatchPrice: "",
      bestBatchUrl: "",
      cheapestBatchName: "",
      cheapestBatchUrl: "",
      cheapestBatchPrice: "",
      description: "",
    },
    // validationSchema: itemValidationSchema(page),
    onSubmit: (values) => {
      onSubmit();
      //   setModalOpen(false);
      //   resetForm();
    },
  });

  const onSubmit = async () => {
    const data = {
      community: page,
      company,
      brand,
      name: valuesName,
      sizeType,
      color,
      images,
      description: valuesDescription,
      bestBatch: {
        name: valuesBestBatchName,
        price: valuesBestBatchPrice,
        url: valuesBestBatchUrl,
      },
      cheapestBatch: {
        name: valuesCheapestBatchName,
        price: valuesCheapestBatchPrice,
        url: valuesCheapestBatchUrl,
      },
    };
    if (data.images.length === 0) {
      return toast.error("please add at least 1 image");
    } else {
      const notification = toast.loading("uploading post...");
      apiService.post
        .ADD_NEW_ITEM(data)
        .then(() => {
          toast.success("New item added", { id: notification });
        })
        .catch(({ response: { data } }) => {
          toast.error(data.error, { id: notification });
        });
    }
  };

  const companiesArr = [
    "adidas",
    "nike",
    "new balance",
    "balenciaga",
    "Alexander McQueen",
  ];
  const brandsArr = [
    "Dunk Low",
    "Off-White x Dunk Low",
    "Air Force 1",
    "New Balance 327",
    "Triple S",
    "Track 2",
    "Speed Trainer",
    "Oversized Sneaker",
  ];
  const sizeTypeArr = ["EU", "AUS", "US", "JAP", "UK"];
  const colors = [
    "red",
    "blue",
    "yellow",
    "grey",
    "brown",
    "green",
    "orange",
    "black",
    "purple",
    "white",
    "pink",
    "all",
  ];

  const textFields = () => {
    return (
      <div className="w-full flex flex-col gap-2 z-100">
        <div className="flex w-full justify-between">
          <label>company:</label>
          <Select
            id="demo-simple-select"
            value={company}
            className=" w-1/2 mx-2 "
            onChange={(event) => {
              setCompany(event.target.value as string);
            }}
            required
          >
            {companiesArr.map((company) => {
              return (
                <MenuItem value={company} key={company}>
                  {company}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex w-full justify-between">
          <label>Brand:</label>
          <Select
            id="demo-simple-select"
            value={brand}
            className=" w-1/2 mx-2 "
            onChange={(event) => {
              setBrand(event.target.value as string);
            }}
            required
          >
            {brandsArr.map((brand) => {
              return (
                <MenuItem value={brand} key={brand}>
                  {brand}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex w-full justify-between">
          <label>Name:</label>
          <TextField
            id="outlined-basic"
            variant="outlined"
            className=" w-1/2 mx-2 "
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={valuesName}
            error={touchedName && Boolean(errorsName)}
            helperText={touchedName && errorsName}
          />
        </div>
        <div className="flex w-full justify-between">
          <label>sizeType:</label>
          <Select
            id="demo-simple-select"
            value={sizeType}
            className=" w-1/2 mx-2 "
            onChange={(event) => {
              setSizeType(event.target.value as string);
            }}
            required
          >
            {sizeTypeArr.map((sizeType) => {
              return (
                <MenuItem value={sizeType} key={sizeType}>
                  {sizeType}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex w-full justify-between">
          <label>color:</label>
          <Select
            id="demo-simple-select"
            value={color}
            className=" w-1/2 mx-2 "
            onChange={(event) => {
              setColor(event.target.value as string);
            }}
            required
          >
            {colors.map((color) => {
              return (
                <MenuItem value={color} key={color}>
                  {color}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col w-full justify-between">
          <label>
            Images:
            <p className="text-xs">(first image will be the main image)</p>
          </label>
          <DropzoneComponent setImages={setImages} maxImagesLength={5} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <h1>Best batch:</h1>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                name="bestBatchName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesBestBatchName}
                error={touchedBestBatchName && Boolean(errorsBestBatchName)}
                helperText={touchedBestBatchName && errorsBestBatchName}
              />
              <TextField
                id="outlined-basic"
                label="Price in ¥"
                variant="outlined"
                type="number"
                name="bestBatchPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesBestBatchPrice}
                error={touchedBestBatchPrice && Boolean(errorsBestBatchPrice)}
                helperText={touchedBestBatchPrice && errorsBestBatchPrice}
              />
            </div>
            <div className="w-full flex gap-5">
              <TextField
                id="outlined-basic"
                label="Url"
                variant="outlined"
                className="w-full"
                type="text"
                name="bestBatchUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesBestBatchUrl}
                error={touchedBestBatchUrl && Boolean(errorsBestBatchUrl)}
                helperText={touchedBestBatchUrl && errorsBestBatchUrl}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h1>Cheapest batch:</h1>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                name="cheapestBatchName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesCheapestBatchName}
                error={
                  touchedCheapestBatchName && Boolean(errorsCheapestBatchName)
                }
                helperText={touchedCheapestBatchName && errorsCheapestBatchName}
              />
              <TextField
                id="outlined-basic"
                label="Price in ¥"
                variant="outlined"
                type="number"
                name="cheapestBatchPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesCheapestBatchPrice}
                error={
                  touchedCheapestBatchPrice && Boolean(errorsCheapestBatchPrice)
                }
                helperText={
                  touchedCheapestBatchPrice && errorsCheapestBatchPrice
                }
              />
            </div>
            <div className="w-full flex gap-5">
              <TextField
                id="outlined-basic"
                label="Url"
                variant="outlined"
                className="w-full"
                type="text"
                name="cheapestBatchUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={valuesCheapestBatchUrl}
                error={
                  touchedCheapestBatchUrl && Boolean(errorsCheapestBatchUrl)
                }
                helperText={touchedCheapestBatchUrl && errorsCheapestBatchUrl}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-between ">
          <label>Description:</label>
          <Textarea
            minRows={1}
            maxRows={1}
            componentsProps={{
              textarea: {
                maxLength: 100,
                dir: "auto",
              },
            }}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={valuesDescription}
            placeholder="Text (optional)"
            variant="soft"
            className=" flex-1 p-2 rounded-md border "
            endDecorator={
              <Typography className="text-xs ml-auto text-gray-500">
                {100 - valuesDescription.length} character(s)
              </Typography>
            }
          />
        </div>
      </div>
    );
  };

  const formButtons = () => {
    return (
      <div className="flex w-full justify-end mt-3">
        <Button
          variant="text"
          type="reset"
          className=" font-semibold text-black text-xs h-8 p-3 xs:text-sm xs:h-10 xs:p-4"
          onClick={() => {
            setModalOpen(false);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          style={{
            backgroundColor: "#1183ca",
          }}
          variant="contained"
          endIcon={<SendIcon />}
          className=" rounded-md mx-1 text-xs h-8 p-3 xs:text-sm xs:h-10 xs:p-4"
        >
          Upload
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="flex justify-center items-center bg-rgba(0,0,0,0.3) z-50"
    >
      <form
        className="flex flex-col items-center justify-center w-full max-w-xl  mx-5 p-5 bg-main rounded-md shadow-sm border"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div
          className="w-full flex justify-end cursor-pointer "
          onClick={() => setModalOpen(false)}
        >
          <MdClose className="text-gray-400 text-2xl" />
        </div>
        <div className="flex flex-col items-center gap-5 font-bold mb-3">
          <h1 className="text-md xs:text-2xl ">Upload {page}</h1>
        </div>
        {textFields()}
        {formButtons()}
      </form>
    </Modal>
  );
}

export default UploadItemModal;
