import React from "react";
import Router from "next/router";
interface page {
  page: string;
}

const pageObj: any = {
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

function AuthFooter(props: page) {
  return (
    <p className="text-[#757171]  ">
      {pageObj[props.page].p}&nbsp;
      <span
        className="text-black hover:underline cursor-pointer"
        onClick={() => {
          Router.push(pageObj[props.page].router);
        }}
      >
        {pageObj[props.page].span}
      </span>
    </p>
  );
}

export default AuthFooter;
