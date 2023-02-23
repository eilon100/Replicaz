import React from "react";
import MenuDrawer from "./components/MenuDrawer";
import { TbShoe, TbShirt, TbHome, TbBell } from "react-icons/tb";
import { RiShoppingBagLine } from "react-icons/ri";
import SearchBar from "./components/SearchBar";
import { useRouter } from "next/router";
import SiteLogo from "./components/SiteLogo";
import UserProfile from "./components/UserProfile";
import { PageNavigation, Notification } from "./components/PageNavigation";

const iconStyle = "text-4xl p-1 cursor-pointer rounded-xl hover:bg-gray-200";

function Header() {
  const router = useRouter();
  const isAuthPage = router.pathname.includes("auth");

  return (
    <div
      className={`sticky top-0 z-50 ${
        isAuthPage ? "hidden" : "flex"
      } justify-center items-center pl-16 pr-2 lg:pr-7 sm:pl-24 py-5 h-20 bg-main shadow-sm `}
    >
      <SiteLogo />
      <PageNavigation />
      <SearchBar />
      <Notification />
      <UserProfile />
      <div className="lg:hidden">
        <MenuDrawer />
      </div>
    </div>
  );
}

export default Header;
