import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { apiService } from '../../utills/apiService';
import AuthHeader from '../../components/Auth/AuthHeader';
import AuthFooter from '../../components/Auth/AuthFooter';
import AuthButton from '../../components/Auth/AuthButton';
import { authValidationSchema } from '../../validation/auth';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/joy';
import PageHead from '../../UI/pages/pageHead';
import ReplicazLogo from '../../public/ReplicazAuthLogo.png';
import ErrorHandler from '../../utills/ErrorHandler';
import usePasswordVisibility from '../../components/Auth/hooks/usePasswordVisibility';

function newPassword() {
  const router = useRouter();
  const { showPassword, VisibilityIcon } = usePasswordVisibility();

  const handleFormSubmit = (
    newValues: any,
    setSubmitting: (Boolean: boolean) => void
  ) => {
    const data = {
      password: newValues.password,
      token: router.query.token,
    };

    apiService.post
      .CREATE_NEW_PASSWORD(data)
      .then(() => {
        toast.success('password changed');
        router.push('/auth/signin');
      })
      .catch((error) => {
        toast.error(ErrorHandler(error));
        setSubmitting(false);
      });
  };
  const {
    handleChange,
    isSubmitting,
    handleBlur,
    values: { password: valuesPassword, confirm: valuesConfirm },
    touched: { password: touchedPassword, confirm: touchedConfirm },
    errors: { password: errorsPassword, confirm: errorsConfirm },
    handleSubmit,
  } = useFormik({
    initialValues: {
      password: '',
      confirm: '',
    },
    validationSchema: authValidationSchema('newPassword'),
    onSubmit: (newValues, { setSubmitting }) => {
      handleFormSubmit(newValues, setSubmitting);
    },
  });

  //components

  const textField = () => {
    return (
      <>
        <TextField
          className="auth_textfield"
          id="password"
          label=" New password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{VisibilityIcon}</InputAdornment>
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
          <img src={ReplicazLogo.src} className="w-[50%] mb-5" />
          {textField()}
          <AuthButton page="newPassword" disableButton={isSubmitting} />
          <AuthFooter page="newPassword" />
        </form>
      </div>
    </div>
  );
}

export default newPassword;
