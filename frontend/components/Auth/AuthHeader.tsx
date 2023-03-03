import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { KeyIcon, UserIcon } from "@heroicons/react/outline";
import React from "react";

interface page {
  page: keyof pageObj;
}
type pageObj = {
  [key: string]: {
    icon: ReactJSXElement;
    h1: string;
    p: string;
  };
};
const pageObj: pageObj = {
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

function AuthHeader({ page }: page) {
  return (
    <header className="flex justify-center my-10">
      <div className="flex flex-col items-start w-[80vw] max-w-xl">
        <div className="flex font-bold items-center ">
          <h1 className=" text-lg ">{pageObj[page].h1}</h1>
          {pageObj[page].icon}
        </div>
        <p className=" text-xs my-1 ">{pageObj[page].p}</p>
      </div>
    </header>
  );
}

export default AuthHeader;
