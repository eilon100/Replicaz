import { createContext, useEffect, useReducer } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

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
      return {
        loggedIn: true,
        userId: action.payload.id,
        userName: action.payload.userName,
        email: action.payload.email,
        userImage: action.payload.userImage,
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
    const cookie = getCookie("userData");
    if (!cookie) {
      toast.error("Error fetching userData");
      return;
    }
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
