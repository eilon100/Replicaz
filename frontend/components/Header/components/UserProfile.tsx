import { LoginIcon } from "@heroicons/react/outline";
import { Divider, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import { apiService } from "../../../utills/apiService";
import { BiExit, BiUser } from "react-icons/bi";
import { deleteCookie } from "cookies-next";
const style = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

function UserProfile() {
  const router = useRouter();
  const {
    state: { loggedIn, userName, userImage, email },
    dispatch,
  } = useContext(AuthContext);
  const [closeOptions, setCloseOptions] = useState<null | HTMLElement>(null);
  const open = Boolean(closeOptions);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    deleteCookie("userData");
    deleteCookie("token");
  };

  const dropDown = () => {
    return (
      <Menu
        anchorEl={closeOptions}
        id="UserOptions"
        open={open}
        onClose={() => setCloseOptions(null)}
        PaperProps={{
          elevation: 0,
          sx: style,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          disabled
          style={{ color: "inherit", opacity: 1 }}
          className="flex flex-col items-start text-sm"
        >
          <p className="truncate font-semibold ">{userName}</p>
          <p className="truncate ">{email}</p>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setCloseOptions(null);
            router.push(`/user/${userName}`);
          }}
          className="flex gap-2 items-center"
        >
          <BiUser className="text-xl" />
          <p className="truncate ">Profile</p>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setCloseOptions(null);
            logOut();
          }}
          className="flex gap-2 items-center"
        >
          <BiExit className=" text-xl" />
          <p className="truncate font-semibold ">Sign out</p>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <div
            className=" hidden lg:flex relative h-10 w-10 cursor-pointer"
            onClick={(event) => {
              setCloseOptions(event.currentTarget);
            }}
          >
            <Image
              className=" rounded-full "
              objectFit="cover"
              src={
                userImage ||
                "https://res.cloudinary.com/dcpuvkirc/image/upload/v1667998882/defualt%20images/blank-profile-picture-gf01729628_1280_pdfkow.png"
              }
              layout="fill"
            />
          </div>
          {dropDown()}
        </>
      ) : (
        <div
          onClick={() => router.push("/auth/signin")}
          className="hidden rounded-xl cursor-pointer items-center space-x-2 border
     border-gray-100 p-2 lg:flex"
        >
          <div className=" relative h-6 w-6 ">
            <LoginIcon className="text-gray-400 pt-[1px]" />
          </div>
          <p className="text-gray-400 ">Sign in</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
