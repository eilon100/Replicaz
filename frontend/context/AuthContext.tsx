import { createContext, useEffect, useReducer } from "react";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { setAuthToken } from "../utills/axiosInstance";

interface AuthProps {
  children: React.ReactNode;
}

export const initialState: any = {
  loggedIn: false,
  userId: null,
  userName: null,
  email: null,
  userImage: null,
};

export const AuthContext = createContext(initialState);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      setAuthToken(action.payload.token);
      setCookie("userData", action.payload.userData, {
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("token", action.payload.token, {
        maxAge: 60 * 60 * 24 * 7,
      });
      return {
        loggedIn: true,
        userId: action.payload.userData.userId,
        userName: action.payload.userData.userName,
        email: action.payload.userData.email,
        userImage: action.payload.userData.userImage,
        role: action.payload.userData.role,
      };
    case "LOGOUT": {
      deleteCookie("userData");
      deleteCookie("token");
      setAuthToken("");
      return initialState;
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const cookie = getCookie("userData");
    if (!cookie) return;
    const user = cookie ? JSON.parse(cookie as string) : null;

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
