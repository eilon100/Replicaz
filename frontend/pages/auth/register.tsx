import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { authValidationSchema } from "../../utills/validation/auth";

const register = () => {
  const formik: any = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      pass: "",
      confirm: "",
    },
    validationSchema: authValidationSchema("register"),
    onSubmit: (values) => {
      registerUser();
    },
  });

  const registerUser = () => {
    let data = JSON.stringify({
      userName:
        formik.values.userName.charAt(0).toUpperCase() +
        formik.values.userName.slice(1).toLowerCase(),
      firstName: formik.values.firstName.toLowerCase(),
      lastName: formik.values.lastName.toLowerCase(),
      email: formik.values.email.toLowerCase(),
      password: formik.values.pass,
    });

    apiService.post
      .REGISTER_USER(data)
      .then(() => {
        toast.success("Verification has been sent to your email");
        Router.push("/auth/signin");
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
          id="userName"
          label="User name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          className="auth_textfield"
          id="firstName"
          label="First name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          className="auth_textfield"
          id="lastName"
          label="Last name"
          type="text"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          className="auth_textfield"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className="auth_textfield"
          id="pass"
          label="Password"
          type="password"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pass}
          error={formik.touched.pass && Boolean(formik.errors.pass)}
          helperText={formik.touched.pass && formik.errors.pass}
        />
        <TextField
          className="auth_textfield"
          id="confirm"
          label="Confirm"
          variant="outlined"
          type="password"
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
    <div className="flex flex-col items-center mb-10 ">
      <div className="flex flex-col">
        <AuthHeader page="register" />
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
          <AuthButton page="register" />
          <p className=" text-[#757171]">Or sign up with</p>
          <AuthFooter page="register" />
        </form>
      </div>
    </div>
  );
};

export default register;
