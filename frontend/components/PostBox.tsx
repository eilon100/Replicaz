import { PhotographIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { apiService } from "../utills/apiService";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UploadPhotos from "./postbox-components/UploadPhotos";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import Textarea from "@mui/joy/Textarea";

type FormData = {
  postTitle: string;
  postBody: string;
  community: string;
};

const uploadImageLength = 5;

function PostBox() {
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn, userName, userImage } = state;
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const [community, setCommunity] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const formik: any = useFormik({
    initialValues: {
      title: "",
      body: "",
      community: "",
    },

    onSubmit: (values) => {
      onSubmit();
    },
  });

  const isPostActive = formik.values.title.length > 0;

  const onSubmit = () => {
    const notification = toast.loading("uploading post...");
    const data = {
      postTitle: formik.values.title,
      postBody: formik.values.body,
      community,
      postImage: images,
    };
    console.log(data);

    apiService.post
      .CREATE_POST(data)
      .then(() =>
        toast.success("post has been created", {
          id: notification,
        })
      )
      .catch((error) =>
        toast.error(error.response.data.error, {
          id: notification,
        })
      );
  };

  //components
  const postBox = () => {
    return (
      <div className="flex items-center space-x-3 ">
        <div className="relative h-9 w-9">
          <Image
            className=" rounded-full "
            objectFit="contain"
            src={userImage || "/../public/EmptyProfile.png"}
            layout="fill"
          />
        </div>
        <Textarea
          placeholder={loggedIn ? "Create a post" : "Sign in to post"}
          required
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          variant="soft"
          disabled={!loggedIn}
          className=" flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none min-w-[80px] resize-none"
        />
        <PhotographIcon
          onClick={() => isPostActive && setImageBoxOpen(!imageBoxOpen)}
          className={`h-7 text-gray-300 ${isPostActive && "cursor-pointer"} ${
            imageBoxOpen && "text-blue-300 "
          }`}
        />
      </div>
    );
  };
  const textArea = () => {
    return (
      <div className="flex items-center">
        <Textarea
          minRows={4}
          maxRows={4}
          name="body"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          error={formik.touched.body && Boolean(formik.errors.body)}
          placeholder="Text (optional)"
          required
          variant="soft"
          disabled={!loggedIn}
          className=" flex-1 m-2 p-2 bg-gray-50 outline-none rounded-md resize-none"
          endDecorator={
            <Typography sx={{ ml: "auto" }} className="text-xs">
              {300 - formik.values.body.length} character(s)
            </Typography>
          }
        />
      </div>
    );
  };
  const communitySelect = () => {
    return (
      <FormControl variant="standard" sx={{ mx: 1.5, maxWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">community</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={community}
          label="Community"
          onChange={(event) => {
            setCommunity(event.target.value);
          }}
        >
          <MenuItem value={"Shoes"}>Shoes</MenuItem>
          <MenuItem value={"Bags"}>Bags</MenuItem>
          <MenuItem value={"Clothes"}>Clothes</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const createPostButton = () => {
    return (
      <div className="flex justify-center mt-2  xs:justify-end">
        <button
          className=" w-36 rounded-full bg-gray-300 p-2 text-white "
          type="submit"
        >
          Create Post
        </button>
      </div>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        formik.handleSubmit(e);
      }}
      className="sticky top-[106px] z-10 bg-white px-3 py-2 rounded-lg border border-gray-300"
    >
      {postBox()}
      {isPostActive && (
        <div className="flex flex-col py-2 ">
          {communitySelect()}
          {textArea()}
          {imageBoxOpen && (
            <UploadPhotos
              setImages={(image: File[]) => setImages(image)}
              imageLength={uploadImageLength}
            />
          )}
          {createPostButton()}
        </div>
      )}
    </form>
  );
}

export default PostBox;
