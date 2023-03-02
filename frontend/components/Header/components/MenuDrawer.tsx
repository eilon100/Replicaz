import React, { useContext, useState } from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import { MenuIcon } from "@heroicons/react/outline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { BiExit, BiUser } from "react-icons/bi";
import { TbHome, TbShirt, TbShoe } from "react-icons/tb";
import { RiShoppingBagLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { apiService } from "../../../utills/apiService";
import { deleteCookie } from "cookies-next";

function MenuDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const {
    dispatch,
    state: { loggedIn, userName, userImage, email },
  } = useContext(AuthContext);
  const { asPath } = useRouter();
  const currentPage =
    asPath === "/community/bags"
      ? "bags"
      : asPath === "/community/shoes"
      ? "shoes"
      : asPath === "/community/clothes"
      ? "clothes"
      : asPath === "/"
      ? "home"
      : asPath === `/user/${userName}`
      ? "profile"
      : null;
  const pagesArr = [
    {
      page: "profile",
      icon: <BiUser className="text-xl text-gray-500" />,
      route: `/user/${userName}`,
    },
    {
      page: "home",
      icon: <TbHome className="text-xl text-gray-500" />,
      route: "/",
    },
    {
      page: "shoes",
      icon: <TbShoe className="text-xl text-gray-500" />,
      route: "/community/shoes",
    },
    {
      page: "clothes",
      icon: <TbShirt className="text-xl text-gray-500" />,
      route: "/community/clothes",
    },
    {
      page: "bags",
      icon: <RiShoppingBagLine className="text-xl text-gray-500" />,
      route: "/community/bags",
    },
  ];
  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    deleteCookie("userData");
    deleteCookie("token");
  };
  const signOut = () => {
    return (
      <ListItem disablePadding>
        <ListItemButton
          className="px-1"
          onClick={() => {
            logOut();
          }}
        >
          <ListItemText
            primary={
              <div className="flex gap-2 items-center">
                <BiExit className="text-xl text-gray-500" />
                <p className=" font-semibold">Sign out</p>
              </div>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  };
  const loggedInUser = () => {
    return (
      <div>
        <ListItem disablePadding>
          <ListItemText
            primary={
              <div>
                <div className="relative h-16 w-16 my-2">
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
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl ">{userName}</h1>
                  <h2 className="truncate text-xs mb-1">{email}</h2>
                </div>
              </div>
            }
          />
        </ListItem>
        <Divider />
        {pagesArr.map(({ page, icon, route }) => {
          return (
            <ListItem disablePadding key={page}>
              <ListItemButton
                className={`px-1 ${
                  currentPage === page ? "cursor-auto bg-gray-200" : ""
                }`}
                onClick={() => {
                  setIsDrawerOpen(false);
                  router.push(route);
                }}
              >
                <ListItemText
                  primary={
                    <div className="flex gap-2">
                      {icon}
                      <p className=" font-semibold capitalize">{page}</p>
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        <Divider />
        {signOut()}
      </div>
    );
  };

  const logOutUser = () => {
    return (
      <div>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push("/auth/signin");
              setIsDrawerOpen(false);
            }}
          >
            <ListItemText primary={"Sign in"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {pagesArr.map(({ page, icon, route }) => {
          if (page === "profile") return;
          return (
            <ListItem disablePadding key={page}>
              <ListItemButton
                className={`px-1 ${
                  currentPage === page ? "cursor-auto bg-gray-200" : ""
                }`}
                onClick={() => {
                  setIsDrawerOpen(false);
                  router.push(route);
                }}
              >
                <ListItemText
                  primary={
                    <div className="flex gap-2">
                      {icon}
                      <p className=" font-semibold capitalize">{page}</p>
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <IconButton
        sx={{ padding: "3px", ml: "0px" }}
        size="small"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon className="h-9" />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={1.5} width="230px" textAlign="center" role="presentation">
          <List>{loggedIn ? loggedInUser() : logOutUser()}</List>
        </Box>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
