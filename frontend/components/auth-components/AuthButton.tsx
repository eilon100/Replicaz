import Button from "@mui/material/Button";
import React from "react";

interface page {
  page: keyof buttonObj;
}

type buttonObj = {
  signIn: string;
  register: string;
  resetPassword: string;
  newPassword: string;
};

const buttonObj: buttonObj = {
  signIn: "LOGIN",
  register: "SIGN UP",
  resetPassword: "RESET",
  newPassword: "CONFIRM",
};

function AuthButton(props: page) {
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-[80vw] max-w-xl rounded-lg h-11 bg-slate-600 hover:bg-slate-600"
    >
      {buttonObj[props.page]}
    </Button>
  );
}

export default AuthButton;
