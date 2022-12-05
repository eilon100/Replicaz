import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { authValidationSchema } from "../../validation/auth";

function newPassword() {
  const router = useRouter();

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
          type="password"
          name="password"
          variant="outlined"
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
