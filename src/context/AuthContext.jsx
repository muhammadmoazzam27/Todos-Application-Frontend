import { createContext, useContext, useEffect, useReducer, useState } from 'react';
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
      return { ...state, isAuth: true, user: action.payload };
    case "SET_LOGOUT":
      return { isAuth: false, user: {} };
    default:
      return state;
  }
};

const AuthContext = ({ children }) => {

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true)

  const readProfile = async (token) => {

    const jwt = token || localStorage.getItem("jwt")

    axios.get(`${VITE_API_URL}/api/user/auth/user`, { headers: { Authorization: `Bearer ${jwt}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          dispatch({ type: "SET_LOGIN", payload: data.user });
        }
      })
      .catch((error) => {
        console.error("Error => ", error)
      })
      .finally(() => {
        setIsAppLoading(false)
      })

  }

  useEffect(() => {
    readProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch({ type: "SET_LOGOUT" });
    message.success("Logout successful");
  };
  return (
    <Auth.Provider value={{ ...state, readProfile, handleLogout, isAppLoading }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(Auth);