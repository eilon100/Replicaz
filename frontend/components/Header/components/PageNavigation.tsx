import { useRouter } from "next/router";
import React from "react";
import { RiShoppingBagLine } from "react-icons/ri";
import { TbBell, TbHome, TbShirt, TbShoe } from "react-icons/tb";

const iconStyle = "text-4xl p-1 cursor-pointer rounded-xl hover:bg-gray-200";

export function Notification() {
  return (
    <div className=" text-gray-500 ml-2 mr-1 lg:mx-4 ">
      <TbBell className={`${iconStyle}`} />
    </div>
  );
}

export function PageNavigation() {
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
