import { PhotographIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { apiService } from "../../utills/apiService";
import { TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import Textarea from "@mui/joy/Textarea";
import { useQueryClient } from "react-query";
import CommunitySelect from "./components/CommunitySelect";
import { postValidationSchema } from "../../validation/post";
import DropzoneComponent from "../../utills/DropZone";
import Button from "@mui/material/Button";
import { currentPage } from "../../types/currentPage";

const maxImageLength = 5;
type PostBoxProps = {
  currentPage: currentPage;
};
function PostBox({ currentPage }: PostBoxProps) {
  const { state } = useContext(AuthContext);
  const { loggedIn, userImage } = state;
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
      community: !community ? currentPage : community,
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
        setCommunity("");
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
  const titlePost = () => {
    return (
      <div className="flex space-x-3 h-14 px-2 mt-2">
        <div className="relative h-10 w-10  ">
          <Image
            className=" rounded-full "
            objectFit="cover"
            src={userImage || "/../public/EmptyProfile.png"}
            layout="fill"
          />
        </div>
        <TextField
          className="flex-1 min-w-[80px] "
          type="text"
          name="title"
          disabled={!loggedIn}
          sx={{
            "& fieldset": { border: "none" },
          }}
          inputProps={{
            className: "h-2 bg-second rounded-md",
            maxLength: 50,
            dir: "auto",
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
          className={`h-7 text-text-third ${isPostActive && "cursor-pointer"} ${
            imageBoxOpen && "text-blue-300 "
          } mt-[6px] `}
        />
      </div>
    );
  };
  const textArea = () => {
    return (
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
        className=" flex-1 m-2 bg-second rounded-md"
        endDecorator={
          <Typography className="text-[0.5rem] xs:text-xs ml-auto text-text-third">
            {300 - valuesBody.length} character(s)
          </Typography>
        }
      />
    );
  };
  const createPostButton = () => {
    return (
      <div className="flex justify-center mt-2 gap-3 xs:justify-end mx-2">
        <Button
          disabled={disableButton}
          style={{
            color: "rgb(33, 150, 243, 0.8)",
            backgroundColor: "transparent",
            border: "1px solid rgb(33, 150, 243, 0.8)",
          }}
          className=" rounded-md bg-button text-xs normal-case px-3 mb-2"
          type="reset"
          onClick={() => {
            resetForm();
            setCommunity("");
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={disableButton}
          style={{
            backgroundColor: "rgb(33, 150, 243,0.8)",
          }}
          className="rounded-md bg-button text-white text-xs normal-case mb-2 px-4"
          type="submit"
        >
          Create Post
        </Button>
      </div>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={` top-[106px] z-10 bg-main px-3 pt-2 rounded-lg border border-gray-300`}
    >
      {titlePost()}
      {isPostActive && (
        <div className="flex flex-col py-2 ">
          {currentPage === "main" ? (
            <CommunitySelect
              community={community}
              setCommunity={setCommunity}
            />
          ) : (
            ""
          )}
          {textArea()}
          {imageBoxOpen && (
            <DropzoneComponent
              setImages={setImages}
              maxImagesLength={maxImageLength}
            />
          )}
          {createPostButton()}
        </div>
      )}
    </form>
  );
}

export default PostBox;
