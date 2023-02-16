import {
  AiOutlineCamera,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FaBirthdayCake, FaPhoneAlt, FaUser } from "react-icons/fa";
import React, { useContext, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContext } from "../../context/AuthContext";
import Feed from "../Feed/Feed";
import { MdMail } from "react-icons/md";
import { TextField } from "@mui/material";
import { apiService } from "../../utills/apiService";
import { authValidationSchema } from "../../validation/auth";
import images from "../../public/iU6oQ8.png";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { user } from "../../types/user";
import UserPageButton from "./components/UserPageButton";

const readFileAsDataURL = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

interface userPageProps {
  userData: user;
}

function UserPage({
  userData: {
    _id,
    userName,
    firstName,
    lastName,
    phone,
    birthDate,
    createdAt,
    image,
    email,
  },
}: userPageProps) {
  const { state, dispatch } = useContext(AuthContext);
  const allowToEdit = _id === state.userId;
  const [editField, setEditField] = useState("");
  const [userData, setUserData] = useState({
    firstName,
    lastName,
    birthDate,
    phone,
    image,
  });
  const [currentUserPosts, setCurrentUserPosts] = useState<"posts" | "saved">(
    "posts"
  );
  const queryClient = useQueryClient();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const EditHandler = async (values: any) => {
    if (!editField) {
      return;
    }
    try {
      const isNameEdited = editField === "name";
      const isBirthDateEdited = editField === "birthDate";
      const isImageEdited = editField === "image" && valuesImage != null;
      const isPhoneEdited = editField === "phone";
      const imageUrlConverter = () => {
        if (isImageEdited) {
          return readFileAsDataURL(valuesImage)
            .then((dataURL) => dataURL)
            .catch((err) => {
              toast.error("Change profile failed");
              throw Error(err);
            });
        } else {
          toast.error("Change profile failed");
          throw Error();
        }
      };

      const editedData: any = {
        ...(isNameEdited && {
          firstName: valuesFirstName.toLowerCase(),
          lastName: valuesLastName.toLowerCase(),
        }),
        ...(isBirthDateEdited && { birthDate: new Date(valuesBirthDate) }),
        ...(isImageEdited && {
          image: await imageUrlConverter(),
        }),
        ...(isPhoneEdited && { phone: valuesPhone }),
      };

      const notification = toast.loading("saving...");
      apiService.patch
        .EDIT_USER_DATA(editedData)
        .then(({ data: { message, userImage } }) => {
          toast.success(message, { id: notification });
          setUserData({ ...userData, ...editedData });

          if (editField === "image") {
            queryClient.invalidateQueries("posts");

            dispatch({
              type: "LOGIN",
              payload: { ...state, userImage },
            });
            setCookie("userData", {
              ...state,
              userImage,
            });
          }
          setSubmitting(false);
          setEditField("");
        })
        .catch(({ response: { data } }) => {
          toast.error(data.error, { id: notification });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    values: {
      firstName: valuesFirstName,
      lastName: valuesLastName,
      birthDate: valuesBirthDate,
      phone: valuesPhone,
      image: valuesImage,
    },
    touched: {
      firstName: touchedFirstName,
      lastName: touchedLastName,
      birthDate: touchedBirthDate,
      phone: touchedPhone,
    },
    errors: {
      firstName: errorsFirstName,
      lastName: errorsLastName,
      birthDate: errorsBirthDate,
      phone: errorsPhone,
    },
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      birthDate: userData.birthDate,
      phone: userData.phone,
      image: null,
    },
    validationSchema: authValidationSchema("editUser"),
    onSubmit: EditHandler,
  });

  const editPhone = () => {
    return (
      <div className="flex items-center gap-4">
        <FaPhoneAlt className=" text-gray-400" />
        {editField !== "phone" ? (
          <>
            <p className="font-light">{userData.phone}</p>
            {allowToEdit && (
              <AiOutlineEdit
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setEditField("phone");
                }}
              />
            )}
          </>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              className=" w-28 lg:w-36"
              size="small"
              id="phone"
              label="Phone"
              type="tel"
              variant="outlined"
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setFieldValue("phone", e.target.value);
                }
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              value={valuesPhone}
              error={touchedPhone && Boolean(errorsPhone)}
              inputProps={{
                maxLength: 10,
                className: "text-sm lg:text-lg ",
              }}
            />
            <div className="flex gap-1">
              <button
                type="reset"
                onClick={() => {
                  setEditField("");
                  setFieldValue("phone", userData.phone);
                }}
              >
                <AiOutlineClose className=" text-red-500 cursor-pointer rounded-sm" />
              </button>
              <button
                type="submit"
                className=" text-green-500 disabled:text-gray-500 disabled:cursor-auto cursor-pointer rounded-sm"
                disabled={valuesPhone === userData.phone || isSubmitting}
              >
                <AiOutlineCheck className="" />
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const editBirthDate = () => {
    return (
      <div className="flex items-center gap-4">
        <FaBirthdayCake className=" text-gray-400" />
        {editField !== "birthDate" ? (
          <>
            <p className="font-light">
              {new Date(userData.birthDate).toLocaleDateString("en-US")}
            </p>
            {allowToEdit && (
              <AiOutlineEdit
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setEditField("birthDate");
                }}
              />
            )}
          </>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className=" w-32 lg:w-36"
                label="Birth date"
                value={valuesBirthDate}
                onChange={(newValue) => {
                  setFieldValue("birthDate", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    onBlur={handleBlur}
                    error={touchedBirthDate && Boolean(errorsBirthDate)}
                  />
                )}
              />
            </LocalizationProvider>
            <div className="flex gap-1">
              <button
                type="reset"
                onClick={() => {
                  setEditField("");
                  setFieldValue("birthDate", userData.birthDate);
                }}
              >
                <AiOutlineClose className=" text-red-500 cursor-pointer rounded-sm" />
              </button>
              <button
                type="submit"
                className=" text-green-500 disabled:text-gray-500 disabled:cursor-auto  cursor-pointer rounded-sm"
                disabled={valuesBirthDate === birthDate || isSubmitting}
              >
                <AiOutlineCheck />
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const editName = () => {
    return (
      <div className=" flex text-xl sm:text-5xl gap-4 h-12">
        {editField !== "name" ? (
          <>
            <h1 className=" font-semibold capitalize">
              {userData.firstName} {userData.lastName}
            </h1>
            {allowToEdit && (
              <AiOutlineEdit
                className="text-gray-400 cursor-pointer mt-1"
                onClick={() => {
                  setEditField("name");
                }}
              />
            )}
          </>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              size="small"
              id="firstName"
              label="First name"
              type="text"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={valuesFirstName}
              error={touchedFirstName && Boolean(errorsFirstName)}
              inputProps={{
                maxLength: 15,
                className: "text-sm sm:text-3xl w-12 sm:w-32 h-full",
              }}
            />
            <TextField
              size="small"
              id="lastName"
              label="Last name"
              type="text"
              variant="outlined"
              onChange={handleChange}
              onBlur={(e) => {
                handleBlur(e);
              }}
              value={valuesLastName}
              error={touchedLastName && Boolean(errorsLastName)}
              inputProps={{
                maxLength: 15,
                className: "text-sm sm:text-3xl w-12 sm:w-32 h-full",
              }}
            />
            <div className="flex gap-1">
              <button
                type="reset"
                onClick={() => {
                  setEditField("");
                  setFieldValue("lastName", userData.lastName);
                  setFieldValue("firstName", userData.firstName);
                }}
              >
                <AiOutlineClose className=" text-red-500 cursor-pointer rounded-sm" />
              </button>
              <button
                type="submit"
                className=" text-green-500 disabled:text-gray-500 cursor-pointer rounded-sm"
                disabled={
                  (valuesLastName === userData.lastName &&
                    valuesFirstName === userData.firstName) ||
                  isSubmitting
                }
              >
                <AiOutlineCheck />
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const editImage = () => {
    return (
      <div>
        <div
          className={`relative bg-white -mt-8 sm:-mt-28
            w-24 h-24 sm:w-52 sm:h-52 lg:w-60 lg:h-60 
          rounded-full p-1 shadow-xl ${
            editField !== "image" && allowToEdit ? "group cursor-pointer" : ""
          }`}
          onClick={() => {
            if (editField !== "image" && allowToEdit)
              imageInputRef.current?.click();
          }}
        >
          <img
            src={userData.image}
            alt="Shoes"
            className="rounded-full object-cover h-full w-full group-hover:brightness-75"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block ">
            <AiOutlineCamera className="text-xl sm:text-6xl text-white" />
          </div>
          {editField === "image" ? (
            <div className="absolute w-full flex justify-around left-1/2 -translate-x-1/2 -translate-y-[80%] sm:-translate-y-[100%] text-xs sm:text-xl">
              <button
                type="reset"
                className="bg-white rounded-full p-1  text-red-500 cursor-pointer"
                onClick={() => {
                  setEditField("");
                  setUserData({
                    ...userData,
                    image,
                  });
                  setFieldValue("image", null);
                }}
              >
                <AiOutlineClose />
              </button>
              <button
                type="submit"
                form="imageForm"
                className="bg-white rounded-full p-1 text-green-500 disabled:text-gray-500 cursor-pointer "
              >
                <AiOutlineCheck />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <form
          id="imageForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            id="image"
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(event) => {
              const files = event.currentTarget?.files;
              if (files && files[0]) {
                setUserData({
                  ...userData,
                  image: URL.createObjectURL(files[0]),
                });
                setFieldValue("image", files[0]);
                setEditField("image");
              }
            }}
          />
        </form>
      </div>
    );
  };

  const changeUserPosts = () => {
    return (
      <div className="px-5 lg:px-0 lg:absolute lg:top-[1.3rem] gap-5 flex text-sm lg:text-base">
        <p
          className={`${
            currentUserPosts === "posts"
              ? "font-semibold border-b-4"
              : "cursor-pointer"
          }  px-1`}
          onClick={() => {
            setCurrentUserPosts("posts");
          }}
        >
          Posts
        </p>
        <p
          className={`${
            currentUserPosts === "saved"
              ? "font-semibold border-b-4 "
              : "cursor-pointer"
          } px-1`}
          onClick={() => {
            setCurrentUserPosts("saved");
          }}
        >
          Saved
        </p>
      </div>
    );
  };

  const header = () => {
    return (
      <div className="bg-white">
        <img
          src={images.src}
          alt="Shoes"
          className=" object-cover w-full h-28 sm:h-44 lg:h-64"
        />
        <div className=" m-auto flex justify-around max-w-[90rem] items-center sm:space-x-12 pb-6 px-5 ">
          <div className="hidden sm:block">{editImage()}</div>
          <div className="flex flex-col gap-2 w-full sm:w-[70%] pt-3 lg:pt-0">
            <div className="flex items-center gap-1 border-b-[1px] pb-2">
              <div className="block sm:hidden">{editImage()}</div>
              <div className="flex flex-col lg:gap-2">
                {editName()}
                <p className="text-xs sm:text-base text-text-second">
                  {userName}
                </p>

                {allowToEdit && (
                  <div className="relative hidden lg:block">
                    {changeUserPosts()}
                  </div>
                )}
              </div>
            </div>
            <div className="flex lg:hidden flex-col">
              {userInfo()}
              <div className="max-w-[13rem] px-4 lg:p-0">
                <UserPageButton
                  reportedUserId={_id}
                  allowToEdit={allowToEdit}
                  email={email}
                />
              </div>
            </div>
          </div>
        </div>
        {allowToEdit && (
          <div className="block lg:hidden">{changeUserPosts()}</div>
        )}
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="flex flex-col bg-white rounded-md lg:shadow-sm gap-2 h-max lg:gap-5 p-4 mt-2 text-sm lg:text-lg">
        <h1 className="hidden lg:block border-b-[1px] pb-2 font-semibold">
          About
        </h1>
        {editPhone()}
        <div className="flex items-center gap-4">
          <MdMail className="mt-1 text-gray-400" />
          <a className="font-light text-sky-500" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        {editBirthDate()}
        <div className="flex items-center gap-4">
          <FaUser className=" text-gray-400" />
          <p className="font-light">
            Member since {new Date(createdAt).toLocaleDateString("en-US")}
          </p>
        </div>
      </div>
    );
  };

  const body = () => {
    return (
      <div className="flex flex-col justify-around lg:flex-row max-w-[90rem] w-full px-5">
        <div className="hidden lg:flex gap-5 flex-col">
          {userInfo()}
          <UserPageButton
            reportedUserId={_id}
            allowToEdit={allowToEdit}
            email={email}
          />
        </div>
        <div className="w-full lg:w-[70%]">
          {currentUserPosts === "saved" ? (
            <Feed currentPage="user" options={{ type: "saved", userName }} />
          ) : (
            <Feed currentPage="user" options={{ type: "posts", userName }} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {header()}
      <div className="flex justify-center items-center mt-5">{body()}</div>
    </div>
  );
}

export default UserPage;
