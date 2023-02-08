import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthFooter from "../../components/Auth/AuthFooter";
import AuthButton from "../../components/Auth/AuthButton";
import { authValidationSchema } from "../../validation/auth";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { log } from "console";

const register = () => {
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    values: {
      userName: valuesUserName,
      firstName: valuesFirstName,
      lastName: valuesLastName,
      birthDate: valuesBirthDate,
      phone: valuesPhone,
      email: valuesEmail,
      password: valuesPassword,
      confirm: valuesConfirm,
    },
    touched: {
      userName: touchedUserName,
      firstName: touchedFirstName,
      lastName: touchedLastName,
      birthDate: touchedBirthDate,
      phone: touchedPhone,
      email: touchedEmail,
      password: touchedPassword,
      confirm: touchedConfirm,
    },
    errors: {
      userName: errorsUserName,
      firstName: errorsFirstName,
      lastName: errorsLastName,
      birthDate: errorsBirthDate,
      phone: errorsPhone,
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
      birthDate: "",
      phone: "",
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
      birthDate: valuesBirthDate,
      phone: valuesPhone,
    };
    console.log(data);
    // apiService.post
    //   .REGISTER_USER(data)
    //   .then(() => {
    //     toast.success("Verification has been sent to your email");
    //     Router.push("/auth/signin");
    //   })
    //   .catch(({ response: { data } }) => {
    //     toast.error(data.error);
    //   });
  };

  //components
  const textField = () => {
    return (
      <>
        <div className="auth_textfield flex gap-2">
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
        </div>
        <div className="auth_textfield flex gap-2">
          <TextField
            className="w-full"
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth date"
              value={valuesBirthDate}
              onChange={(newValue) => {
                setFieldValue("birthDate", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={handleBlur}
                  error={touchedBirthDate && Boolean(errorsBirthDate)}
                  helperText={touchedBirthDate && errorsBirthDate}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <TextField
          className="auth_textfield"
          id="phone"
          label="Phone"
          type="tel"
          variant="outlined"
          onChange={(e) => {
            const regex = /^[0-9\b]+$/;
            if (e.target.value === "" || regex.test(e.target.value)) {
              setFieldValue("phone", e.target.value);
            }
          }}
          onBlur={handleBlur}
          value={valuesPhone}
          error={touchedPhone && Boolean(errorsPhone)}
          helperText={touchedPhone && errorsPhone}
          inputProps={{ maxLength: 10 }}
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
          className="flex flex-col justify-center items-center space-y-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          method="post"
          action="/api/auth/signin/email"
        >
          <h1 className="font-bold text-5xl">Replicaz</h1>
          {textField()}
          <AuthButton page="register" />
          <AuthFooter page="register" />
        </form>
      </div>
    </div>
  );
};

export default register;
