import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthFooter from "../../components/Auth/AuthFooter";
import AuthButton from "../../components/Auth/AuthButton";
import { authValidationSchema } from "../../validation/auth";
import PageHead from "../../UI/pages/pageHead";

function ForgetPassword() {
  const {
    handleChange,
    handleBlur,
    values: { email: valuesEmail },
    touched: { email: touchedEmail },
    errors: { email: errorsEmail },
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: authValidationSchema("resetPassword"),
    onSubmit: () => {
      handleFormSubmit();
    },
  });

  const handleFormSubmit = () => {
    const data = { email: valuesEmail };

    apiService.post
      .RESET_PASSWORD(data)
      .then(() => {
        toast.success("Reset password has been sent to your email");
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  //components

  const textField = () => {
    return (
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
    );
  };

  return (
    <div className="flex flex-col items-center">
      <PageHead title="Reset Password" />
      <div className="flex flex-col">
        <AuthHeader page="resetPassword" />
        <form
          className="flex flex-col justify-center items-center space-y-8"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1 className="font-bold text-5xl">Replicaz</h1>
          {textField()}
          <AuthButton page="resetPassword" />
          <AuthFooter page="resetPassword" />
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
