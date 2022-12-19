import React from "react";
import Router from "next/router";
interface page {
  page: keyof pageObj;
}
type pageObj = {
  [key: string]: { p: string; span: string; router: string };
};

const pageObj: pageObj = {
  signIn: { p: "Not register yet?", span: "Sign up", router: "/auth/register" },
  register: {
    p: "Have an account?",
    span: "Sign in",
    router: "/auth/signin",
  },
  resetPassword: {
    p: "Have an account?",
    span: "Sign in",
    router: "/auth/signin",
  },
  newPassword: {
    p: "Have an account?",
    span: "Sign in",
    router: "/auth/signin",
  },
};

function AuthFooter({ page }: page) {
  return (
    <p className="text-text-second  ">
      {pageObj[page].p}&nbsp;
      <span
        className="text-text-main hover:underline cursor-pointer"
        onClick={() => {
          Router.push(pageObj[page].router);
        }}
      >
        {pageObj[page].span}
      </span>
    </p>
  );
}

export default AuthFooter;
