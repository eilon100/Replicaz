import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthFooter from "../../components/Auth/AuthFooter";
import AuthButton from "../../components/Auth/AuthButton";
import { authValidationSchema } from "../../validation/auth";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/joy";
import PageHead from "../../UI/pages/pageHead";

function newPassword() {
  const router = useRouter();
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
    values: { password: valuesPassword, confirm: valuesConfirm },
    touched: { password: touchedPassword, confirm: touchedConfirm },
    errors: { password: errorsPassword, confirm: errorsConfirm },
    handleSubmit,
  } = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },
    validationSchema: authValidationSchema("newPassword"),
    onSubmit: () => {
      handleFormSubmit();
    },
  });

  const handleFormSubmit = () => {
    const token = router.query.token;
    let data = {
      password: valuesPassword,
      token: token,
    };

    apiService.post
      .CREATE_NEW_PASSWORD(data)
      .then(() => {
        toast.success("password changed");
        router.push("/auth/signin");
      })
      .catch((error) => {
        toast.error(error.response?.data?.error);
      });
  };

  //components

  const textField = () => {
    return (
      <>
        <TextField
          className="auth_textfield"
          id="password"
          label=" New password"
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
        <TextField
          className="auth_textfield "
          id="confirm"
          label="confirm"
          variant="outlined"
          type="password"
          name="confirm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesConfirm}
          error={touchedConfirm && Boolean(errorsConfirm)}
          helperText={touchedConfirm && errorsConfirm}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <PageHead title="New Password" />
      <div className="flex flex-col">
        <AuthHeader page="newPassword" />
        <form
          className="flex flex-col justify-center items-center space-y-8"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1 className="font-bold text-5xl">Replicaz</h1>
          {textField()}
          <AuthButton page="newPassword" />
          <AuthFooter page="newPassword" />
        </form>
      </div>
    </div>
  );
}

export default newPassword;
