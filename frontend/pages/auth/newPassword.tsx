import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { ValidationSchema } from "../../utills/validation";

function newPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      pass: "",
      confirm: "",
    },
    validationSchema: ValidationSchema("newPassword"),
    onSubmit: (values) => {
      handleFormSubmit();
    },
  });
  const handleFormSubmit = () => {
    const password = formik.values.pass;
    const token = router.query.token;
    let data = JSON.stringify({
      password: password,
      token: token,
    });

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
          name="pass"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pass}
          error={formik.touched.pass && Boolean(formik.errors.pass)}
          helperText={formik.touched.pass && formik.errors.pass}
        />
        <TextField
          className="auth_textfield "
          id="confirm"
          label="confirm"
          variant="outlined"
          type="password"
          name="confirm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm}
          error={formik.touched.confirm && Boolean(formik.errors.confirm)}
          helperText={formik.touched.confirm && formik.errors.confirm}
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
            formik.handleSubmit(e);
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
