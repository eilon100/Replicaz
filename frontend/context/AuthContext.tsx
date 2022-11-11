import { createContext, useEffect, useReducer } from "react";
import { CookieValueTypes, getCookie } from "cookies-next";
interface AuthProps {
  children: React.ReactNode;
}

export const initialState: any = {
  loggedIn: false,
  name: null,
  email: null,
  image: null,
};

export const AuthContext = createContext(initialState);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true,
        name: action.payload.name,
        email: action.payload.email,
        image: action.payload.image,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const cookie: any = getCookie("userData");
    const user = cookie ? JSON.parse(cookie) : undefined;
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
