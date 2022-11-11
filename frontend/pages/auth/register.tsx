import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Router from "next/router";
import toast from "react-hot-toast";
import { apiService } from "../../utills/apiService";
import AuthHeader from "../../components/auth-components/AuthHeader";
import AuthFooter from "../../components/auth-components/AuthFooter";
import AuthButton from "../../components/auth-components/AuthButton";
import { ValidationSchema } from "../../utills/validation";

const register = () => {
  const formik: any = useFormik({
    initialValues: {
      username: "",
      email: "",
      pass: "",
      confirm: "",
    },
    validationSchema: ValidationSchema("register"),
    onSubmit: (values) => {
      registerUser();
    },
  });

  const registerUser = () => {
    let data = JSON.stringify({
      username:
        formik.values.username.charAt(0).toUpperCase() +
        formik.values.username.slice(1).toLowerCase(),
      email: formik.values.email,
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
          id="username"
          label="User name"
          type="text"
          name="username"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
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
        <TextField
          className="auth_textfield"
          id="password"
          label="Password"
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
          className="auth_textfield"
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
    <div className="flex flex-col items-center ">
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
