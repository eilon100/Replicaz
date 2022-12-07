import { PhotographIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { apiService } from "../utills/apiService";
import {
  TextField,
  Typography,
} from "@mui/material";
import UploadPhotos from "./postbox-components/UploadPhotos";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import Textarea from "@mui/joy/Textarea";
import { useQueryClient } from "react-query";
import CommunitySelect from "./postbox-components/CommunitySelect";
import { postValidationSchema } from "../validation/post";

const uploadImageLength = 5;

function PostBox() {
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn, userName, userImage } = state;
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const [community, setCommunity] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const queryClient = useQueryClient();

  const {
    handleChange,
    handleBlur,
    values: { body: valuesBody, title: valuesTitle },
    touched: { body: touchedBody, title: touchedTitle },
    errors: { body: errorsBody, title: errorsTitle },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      body: "",
      community: "",
    },
    validationSchema: postValidationSchema("postBox"),
    onSubmit: () => {
      onSubmit();
    },
  });

  const isPostActive = valuesTitle.length > 0;

  const onSubmit = () => {
    const notification = toast.loading("uploading post...");
    setDisableButton(true);
    const data = {
      postTitle: valuesTitle,
      postBody: valuesBody,
      community,
      postImage: images,
    };

    apiService.post
      .CREATE_POST(data)
      .then(() => {
        toast.success("post has been created", {
          id: notification,
        });
        queryClient.invalidateQueries("posts");
        resetForm();
        setImageBoxOpen(false);
        setDisableButton(false);
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error, {
          id: notification,
        });
        setDisableButton(false);
      });
  };

  //components
  const postBox = () => {
    return (
      <div className="flex items-start space-x-3 h-14 px-2 mt-2">
        <div className="relative h-10 w-10  ">
          <Image
            className=" rounded-full "
            objectFit="contain"
            src={userImage || "/../public/EmptyProfile.png"}
            layout="fill"
          />
        </div>
        <TextField
          className=" flex-1 h-1 px-1 min-w-[80px] "
          type="text"
          name="title"
          disabled={!loggedIn}
          variant="outlined"
          sx={{
            "& fieldset": { border: "none" },
          }}
          inputProps={{
            className: "h-2 bg-gray-50 rounded-md",
            maxLength: 50,
          }}
          placeholder={loggedIn ? "Create a post" : "Sign in to post"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesTitle}
          error={!!errorsTitle}
          helperText={errorsTitle}
        />
        <PhotographIcon
          onClick={() => isPostActive && setImageBoxOpen(!imageBoxOpen)}
          className={`h-7 text-gray-300 ${isPostActive && "cursor-pointer"} ${
            imageBoxOpen && "text-blue-300 "
          } mt-[6px] `}
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
          componentsProps={{
            textarea: {
              maxLength: 300,
              dir: "auto",
            },
          }}
          name="body"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesBody}
          error={touchedBody && Boolean(errorsBody)}
          placeholder="Text (optional)"
          variant="soft"
          disabled={!loggedIn}
          className=" flex-1 m-2 p-2 bg-gray-50 !outline-none !border-none rounded-md resize-none "
          endDecorator={
            <Typography className="text-[0.5rem] xs:text-xs ml-auto text-gray-500">
              {300 - valuesBody.length} character(s)
            </Typography>
          }
        />
      </div>
    );
  };

  const createPostButton = () => {
    return (
      <div className="flex justify-center mt-2  xs:justify-end">
        <button
          disabled={disableButton}
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
        handleSubmit(e);
      }}
      className="sticky top-[106px] z-10 bg-white px-3 py-2 rounded-lg border border-gray-300"
    >
      {postBox()}
      {isPostActive && (
        <div className="flex flex-col py-2 ">
          <CommunitySelect community={community} setCommunity={setCommunity} />
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
