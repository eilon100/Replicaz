import React from "react";
import { LoginIcon, BellIcon, ChatIcon } from "@heroicons/react/outline";
import MenuDrawer from "./components/MenuDrawer";
import { TbShoe, TbShirt, TbHome, TbBell } from "react-icons/tb";
import { RiShoppingBagLine } from "react-icons/ri";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";
import { apiService } from "../../utills/apiService";
import toast from "react-hot-toast";
import SiteLogo from "./components/SiteLogo";

const iconStyle = "text-4xl p-1 cursor-pointer rounded-xl hover:bg-gray-200";

function Header() {
  const router = useRouter();
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
      : null;
  const pagesArr = [
    {
      page: "shoes",
      icon: (
        <TbShoe
          className={`${iconStyle} ${
            currentPage === "shoes" ? "cursor-auto  bg-gray-200" : ""
          }`}
        />
      ),
      route: "/community/shoes",
    },
    {
      page: "clothes",
      icon: (
        <TbShirt
          className={`${iconStyle} ${
            currentPage === "clothes" ? "cursor-auto bg-gray-200" : ""
          }`}
        />
      ),
      route: "/community/clothes",
    },
    {
      page: "bags",
      icon: (
        <RiShoppingBagLine
          className={`${iconStyle} ${
            currentPage === "bags" ? "cursor-auto bg-gray-200" : ""
          }`}
        />
      ),
      route: "/community/bags",
    },
    {
      page: "home",
      icon: (
        <TbHome
          className={`${iconStyle} ${
            currentPage === "home" ? "cursor-auto bg-gray-200" : ""
          }`}
        />
      ),
      route: "/",
    },
  ];
  const isAuthPage = router.pathname.includes("auth");
  const {
    state: { loggedIn, userName, userImage },
    dispatch,
  } = useContext(AuthContext);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });

    apiService.get
      .LOGOUT()
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const notification = () => (
    <div className=" hidden text-gray-500 items-center space-x-1 mx-5 lg:inline-flex">
      <TbBell className={`${iconStyle}`} />
    </div>
  );

  const pages = () => {
    return (
      <div className=" hidden text-gray-500  items-center space-x-1 mx-5 lg:inline-flex">
        {pagesArr.map(({ page, route, icon }) => {
          return (
            <button
              key={page}
              disabled={currentPage === page}
              onClick={() => router.push(route)}
            >
              {icon}
            </button>
          );
        })}
      </div>
    );
  };

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
      } justify-center items-center pl-16 py-5 h-[82px] bg-main shadow-sm sm:px-3 sm:pl-24 pr-3 `}
    >
      <SiteLogo />
      {pages()}
      <SearchBar />
      {notification()}
      {menuDrawer()}
      {authentication()}
    </div>
  );
}

export default Header;
