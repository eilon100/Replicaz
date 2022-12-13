import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { authValidationSchema } from "../../validation/auth";

const register = () => {
  const {
    handleChange,
    handleBlur,
    values: {
      userName: valuesUserName,
      firstName: valuesFirstName,
      lastName: valuesLastName,
      email: valuesEmail,
      password: valuesPassword,
      confirm: valuesConfirm,
    },
    touched: {
      userName: touchedUserName,
      firstName: touchedFirstName,
      lastName: touchedLastName,
      email: touchedEmail,
      password: touchedPassword,
      confirm: touchedConfirm,
    },
    errors: {
      userName: errorsUserName,
      firstName: errorsFirstName,
      lastName: errorsLastName,
      email: errorsEmail,
      password: errorsPassword,
      confirm: errorsConfirm,
    },
    handleSubmit,
  } = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: authValidationSchema("register"),
    onSubmit: () => {
      registerUser();
    },
  });

  const registerUser = () => {
    let data = {
      userName:
        valuesUserName.charAt(0).toUpperCase() +
        valuesUserName.slice(1).toLowerCase(),
      firstName: valuesFirstName.toLowerCase(),
      lastName: valuesLastName.toLowerCase(),
      email: valuesEmail.toLowerCase(),
      password: valuesPassword,
    };

    apiService.post
      .REGISTER_USER(data)
      .then(() => {
        toast.success("Verification has been sent to your email");
        Router.push("/auth/signin");
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
          id="userName"
          label="User name"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesUserName}
          error={touchedUserName && Boolean(errorsUserName)}
          helperText={touchedUserName && errorsUserName}
        />
        <TextField
          className="auth_textfield"
          id="firstName"
          label="First name"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesFirstName}
          error={touchedFirstName && Boolean(errorsFirstName)}
          helperText={touchedFirstName && errorsFirstName}
        />
        <TextField
          className="auth_textfield"
          id="lastName"
          label="Last name"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesLastName}
          error={touchedLastName && Boolean(errorsLastName)}
          helperText={touchedLastName && errorsLastName}
        />
        <TextField
          className="auth_textfield"
          id="email"
          label="Email"
          type="email"
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
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesPassword}
          error={touchedPassword && Boolean(errorsPassword)}
          helperText={touchedPassword && errorsPassword}
        />
        <TextField
          className="auth_textfield"
          id="confirm"
          label="Confirm"
          variant="outlined"
          type="password"
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
    <div className="flex flex-col items-center mb-10 ">
      <div className="flex flex-col">
        <AuthHeader page="register" />
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
          <AuthButton page="register" />
          <p className=" text-text-second">Or sign up with</p>
          <AuthFooter page="register" />
        </form>
      </div>
    </div>
  );
};

export default register;
