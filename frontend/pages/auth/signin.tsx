import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { apiService } from "../../utills/apiService";
import { AuthContext } from "../../context/AuthContext";
import { authValidationSchema } from "../../validation/auth";

const SignIn = () => {
  useEffect(() => {
    let cookie = getCookie("active");

    if (cookie === "Succeeded") {
      toast.success("Verification was successful");
    }
    if (cookie === "failed") {
      toast.error("Verification failed");
    }
    deleteCookie("active");
  }, []);

  const { state, dispatch } = useContext(AuthContext);

  const {
    handleChange,
    handleBlur,
    values: { email: valuesEmail, password: valuesPassword },
    touched: { email: touchedEmail, password: touchedPassword },
    errors: { email: errorsEmail, password: errorsPassword },
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authValidationSchema("signin"),

    onSubmit: () => {
      loginUser();
    },
  });

  const loginUser = async () => {
    let data = {
      email: valuesEmail,
      password: valuesPassword,
    };

    apiService.post
      .LOGIN_USER(data)
      .then(() => {
        const cookie = getCookie("userData");
        if (!cookie) {
          toast.error("Error fetching userData");
          return;
        }
        const userData = JSON.parse(cookie as string);
        dispatch({ type: "LOGIN", payload: userData });
        toast.success("Login successfully");
        Router.push("/");
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  //components

  const textField = () => {
    return (
      <>
        <TextField
          className="auth_textfield"
          id="email"
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesEmail}
          error={touchedEmail && Boolean(errorsEmail)}
          helperText={touchedEmail && errorsEmail}
        />
        <TextField
          className="auth_textfield"
          id="password"
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesPassword}
          error={touchedPassword && Boolean(errorsPassword)}
          helperText={touchedPassword && errorsPassword}
        />
      </>
    );
  };
  const forgetPassword = () => {
    return (
      <div className="text-xs ml-auto cursor-pointer hover:underline">
        <p
          onClick={() => {
            Router.push("/auth/resetPassword");
          }}
        >
          Forget Password ?
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col">
        <AuthHeader page="signIn" />
        <form
          className="flex flex-col justify-center items-center space-y-8 "
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          method="post"
          action="/api/auth/signin/email"
        >
          <h1 className="font-bold text-5xl">Replicaz</h1>
          {textField()}
          {forgetPassword()}
          <AuthButton page="signIn" />
          <p className=" text-[#757171]">Or sign in with</p>
          <AuthFooter page="signIn" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
