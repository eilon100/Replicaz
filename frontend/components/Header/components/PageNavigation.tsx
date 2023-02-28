import { useRouter } from "next/router";
import React from "react";
import { RiShoppingBagLine } from "react-icons/ri";
import {  TbHome, TbShirt, TbShoe } from "react-icons/tb";

function PageNavigation() {
  const router = useRouter();
  const { asPath } = useRouter();
  const routeIncludesQuery = asPath.includes("?");
  const currentRoute = routeIncludesQuery
    ? asPath.slice(0, asPath.indexOf("?"))
    : asPath;

  const currentPage =
    currentRoute === "/community/bags"
      ? "bags"
      : currentRoute === "/community/shoes"
      ? "shoes"
      : currentRoute === "/community/clothes"
      ? "clothes"
      : currentRoute === "/"
      ? "home"
      : null;

  const pagesArr = [
    {
      page: "shoes",
      icon: (
        <TbShoe
          className={`header_icons ${
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
          className={`header_icons ${
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
          className={`header_icons ${
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
          className={`header_icons ${
            currentPage === "home" ? "cursor-auto bg-gray-200" : ""
          }`}
        />
      ),
      route: "/",
    },
  ];
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
  return <div>{pages()}</div>;
}

export default PageNavigation;
