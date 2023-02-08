import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";
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
          <AuthFooter page="signIn" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
