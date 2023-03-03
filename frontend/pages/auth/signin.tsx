import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthFooter from "../../components/Auth/AuthFooter";
import AuthButton from "../../components/Auth/AuthButton";
import { apiService } from "../../utills/apiService";
import { AuthContext } from "../../context/AuthContext";
import { authValidationSchema } from "../../validation/auth";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/joy";
import PageHead from "../../UI/pages/pageHead";
import ReplicazLogo from "../../public/ReplicazAuthLogo.png";
import  instance  from "axios";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    handleChange,
    isSubmitting,
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
      .then(({ data: { token, userData } }) => {
        setCookie("userData", userData, {
          maxAge: 60 * 60 * 24 * 7,
        });
        setCookie("token", token, {
          maxAge: 60 * 60 * 24 * 7,
        });
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
      <div className="flex justify-end w-[80vw] max-w-xl">
        <p
          className="text-xs cursor-pointer hover:underline"
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
      <PageHead title="Sign in" />
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
          <img src={ReplicazLogo.src} className="w-[50%] mb-5" />
          {textField()}
          {forgetPassword()}
          <AuthButton page="signIn" disableButton={isSubmitting} />
          <AuthFooter page="signIn" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
