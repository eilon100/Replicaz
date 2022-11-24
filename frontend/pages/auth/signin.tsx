import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import Router, { SingletonRouter } from "next/router";
import toast from "react-hot-toast";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { apiService } from "../../utills/apiService";
import { AuthContext } from "../../context/AuthContext";
import { authValidationSchema } from "../../utills/validation/auth";
import axios from "axios";

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

  const formik: any = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: authValidationSchema("signin"),

    onSubmit: (values) => {
      loginUser();
    },
  });

  const loginUser = async () => {
    let data = JSON.stringify({
      email: formik.values.email,
      password: formik.values.pass,
    });

    apiService.post
      .LOGIN_USER(data)
      .then((res) => {
        const cookie: any = getCookie("userData");
        const userData = JSON.parse(cookie);
        dispatch({ type: "LOGIN", payload: userData });
        toast.success("Login successfully");
        Router.push("/");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className="auth_textfield"
          id="password"
          label="Password"
          type="password"
          name="pass"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pass}
          error={formik.touched.pass && Boolean(formik.errors.pass)}
          helperText={formik.touched.pass && formik.errors.pass}
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
            formik.handleSubmit(e);
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
