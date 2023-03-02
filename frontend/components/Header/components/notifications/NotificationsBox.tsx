import { Divider, Menu } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { TbBell } from "react-icons/tb";
import { AuthContext } from "../../../../context/AuthContext";
import AllNotifications from "./components/AllNotifications";
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
    "@media (min-width: 640px)": {
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
  },
  "& ul": {
    pb: 0,
  },
};
const styleNotificationFilter = "font-semibold border-gray-500 border-b-4";
function Notifications() {
  const router = useRouter();
  const {
    state: { loggedIn },
  } = useContext(AuthContext);
  useEffect(() => {
    setCloseOptions(null);
  }, [router.asPath]);

  const [closeOptions, setCloseOptions] = useState<null | HTMLElement>(null);
  const [notificationsFilter, setNotificationsFilter] = useState(true);
  const open = Boolean(closeOptions);

  const FilterButtons = () => {
    return (
      <div className="flex justify-center p-0 cursor-auto">
        {" "}
        <p
          onClick={() => setNotificationsFilter(false)}
          className={`${
            !notificationsFilter ? styleNotificationFilter : "cursor-pointer"
          } w-1/2 flex justify-center p-2`}
        >
          New
        </p>
        <p
          onClick={() => setNotificationsFilter(true)}
          className={`${
            notificationsFilter ? styleNotificationFilter : "cursor-pointer"
          } w-1/2 flex justify-center p-2`}
        >
          All
        </p>
      </div>
    );
  };

  const dropDown = () => {
    return (
      <Menu
        anchorEl={closeOptions}
        open={open}
        onClose={() => setCloseOptions(null)}
        PaperProps={{
          elevation: 0,
          sx: style,
          className: "w-screen sm:w-[30rem] sm:max-w-lg",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="pb-2 pt-1 px-4 sm:p-4 ">
          <p className="font-bold text-black text-sm sm:text-base">
            Notifications
          </p>
        </div>
        <Divider />
        <div className=" max-h-60 overflow-y-auto overflow-x-hidden">
          <AllNotifications seen={notificationsFilter} />
        </div>
        <Divider />
        <FilterButtons />
      </Menu>
    );
  };

  return (
    <div className="relative">
      <div
        className=" text-gray-500 ml-2 mr-1 lg:mx-4 "
        onClick={(event) => {
          loggedIn ? setCloseOptions(event.currentTarget) : "";
        }}
      >
        <TbBell
          className={`header_icons ${
            !loggedIn ? "!cursor-auto hover:!bg-white" : ""
          }`}
        />
      </div>
      {dropDown()}
    </div>
  );
}

export default Notifications;
