import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { authValidationSchema } from "../../utills/validation/auth";

function ForgetPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: authValidationSchema("resetPassword"),
    onSubmit: (values) => {
      handleFormSubmit();
    },
  });
  const handleFormSubmit = () => {
    const data = { email: formik.values.email };

    apiService.post
      .RESET_PASSWORD(data)
      .then(() => {
        toast.success("Reset password has been sent to your email");
      })
      .catch((error) => {
        toast.error(error.response?.data?.error);
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
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <AuthHeader page="resetPassword" />
        <form
          className="flex flex-col justify-center items-center space-y-8"
          onSubmit={(e) => {
            formik.handleSubmit(e);
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
