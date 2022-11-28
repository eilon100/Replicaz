import React from "react";
import { LoginIcon, BellIcon, ChatIcon } from "@heroicons/react/outline";
import MenuDrawer from "./header-components/MenuDrawer";
import GroupSelect from "./header-components/GroupsSelect";
import SiteLogo from "./header-components/SiteLogo";
import SearchBar from "./header-components/SearchBar";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";
import { apiService } from "../utills/apiService";
import toast from "react-hot-toast";

function Header() {

  const router = useRouter();
  const isAuthPage = router.pathname.includes("auth");
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn, userName, userImage } = state;

  const logOut = () => {
    dispatch({ type: "LOGOUT" });

    apiService.get
      .LOGOUT()
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const icons = () => (
    <div className=" hidden text-gray-500 items-center space-x-2 mx-5 lg:inline-flex">
      <ChatIcon className="icons" />
      <BellIcon className="icons" />
    </div>
  );

  const menuDrawer = () => (
    <div className="flex ml-2 items-center lg:hidden">
      <MenuDrawer />
    </div>
  );

  const authentication = () => {
    if (loggedIn) {
      return (
        <div
          onClick={() => logOut()}
          className="hidden rounded-xl cursor-pointer items-center space-x-2 border
       border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-6 w-6">
            <Image
              className=" rounded-full "
              objectFit="contain"
              src={userImage || "/../public/EmptyProfile.png"}
              layout="fill"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate ">{userName}</p>
            <p className="text-gray-400 ">Sign out</p>
          </div>
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          router.push("/auth/signin");
        }}
        className="hidden rounded-xl cursor-pointer space-x-2 border
       border-gray-100 p-2 lg:flex"
      >
        <div className=" relative h-6 w-6 ">
          <LoginIcon className="text-gray-400 pt-[1px]" />
        </div>
        <p className="text-gray-400 ">Sign in</p>
      </div>
    );
  };

  return (
    <div
      className={`sticky top-0 z-50 ${
        isAuthPage ? "hidden" : "flex"
      } justify-center items-center pl-16 py-5 h-[82px] bg-white shadow-sm sm:px-3 sm:pl-24 pr-3 `}
    >
      <SiteLogo />
      <GroupSelect />
      <SearchBar />
      {icons()}
      {menuDrawer()}
      {authentication()}
    </div>
  );
}

export default Header;
