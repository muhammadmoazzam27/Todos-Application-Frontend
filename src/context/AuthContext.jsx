import { createContext, useContext, useEffect, useReducer } from 'react';
import { message } from 'antd';
import axios from 'axios';

const Auth = createContext();

const initialState = {
  isAuth: false,
  user: {},
  isAppLoading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, isAuth: true, user: action.payload, isAppLoading: false };
    case "SET_LOGOUT":
      return { isAuth: false, user: {}, isAppLoading: false };
    case "STOP_LOADING":
      return { ...state, isAppLoading: false };
    default:
      return state;
  }
};

const AuthContext = ({ children }) => {
  const VITE_AUTH_API_USER = import.meta.env.VITE_AUTH_API_USER;

  const [state, dispatch] = useReducer(reducer, initialState);

  const readProfile = async (token) => {
    const jwt = token || localStorage.getItem("jwt");

    if (!jwt) {
      dispatch({ type: "STOP_LOADING" });
      return;
    }

    try {
      const res = await axios.get(`${VITE_AUTH_API_USER}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });

      const { status, data } = res;
      if (status === 200) {
        dispatch({ type: "SET_LOGIN", payload: data.user });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      localStorage.removeItem("jwt");
      dispatch({ type: "SET_LOGOUT" });
    }
  };

  useEffect(() => {
    readProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch({ type: "SET_LOGOUT" });
    message.success("Logout successful");
  };

  return (
    <Auth.Provider value={{ ...state, readProfile, handleLogout }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(Auth);