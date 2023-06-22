import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/joy';
import React, { useState } from 'react';

function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const VisibilityIcon = (
    <IconButton
      aria-label="toggle password visibility"
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
    >
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );

  return {
    showPassword,
    VisibilityIcon,
  };
}

export default usePasswordVisibility;
