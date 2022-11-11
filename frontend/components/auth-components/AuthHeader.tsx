import { KeyIcon, UserIcon } from "@heroicons/react/outline";
import React from "react";

interface page {
  page: string;
}

const pageObj: any = {
  signIn: {
    icon: <UserIcon className="h-4 w-4 ml-1" />,
    h1: "Login account",
    p: "Welcome back",
  },
  register: {
    icon: <UserIcon className="h-4 w-4 ml-1" />,
    h1: "Create account",
    p: "Welcome",
  },
  resetPassword: {
    icon: <KeyIcon className="h-4 w-4 ml-1" />,
    h1: "Reset password",
    p: "",
  },
  newPassword: {
    icon: <KeyIcon className="h-4 w-4 ml-1" />,
    h1: "New password",
    p: "",
  },
};

function AuthHeader(props: page) {
  return (
    <header className="flex flex-col items-start mt-12 mb-10">
      <div className="flex font-bold items-center ">
        <h1 className=" text-lg ">{pageObj[props.page].h1}</h1>
        {pageObj[props.page].icon}
      </div>
      <p className=" text-xs my-1 ">{pageObj[props.page].p}</p>
    </header>
  );
}

export default AuthHeader;
