import React from "react";
import MenuDrawer from "./components/MenuDrawer";
import { TbShoe, TbShirt, TbHome, TbBell } from "react-icons/tb";
import { RiShoppingBagLine } from "react-icons/ri";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/router";
import SiteLogo from "./components/SiteLogo";
import UserProfile from "./components/UserProfile";

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

  const notification = () => (
    <div className=" text-gray-500 ml-2 mr-1 lg:mx-4 ">
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
    <div className="lg:hidden">
      <MenuDrawer />
    </div>
  );

  return (
    <div
      className={`sticky top-0 z-50 ${
        isAuthPage ? "hidden" : "flex"
      } justify-center items-center pl-16 pr-2 lg:pr-7 sm:pl-24 py-5 h-20 bg-main shadow-sm `}
    >
      <SiteLogo />
      {pages()}
      <SearchBar />
      {notification()}
      <UserProfile />
      {menuDrawer()}
    </div>
  );
}

export default Header;
