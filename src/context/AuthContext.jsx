import { message } from 'antd';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const Auth = createContext();

const initialState = { isAuth: false, user: {}, isAppLoading: true };

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

}

const AuthContext = ({ children }) => {

  const VITE_AUTH_API_USER = import.meta.env.VITE_AUTH_API_USER

  const [state, dispatch] = useReducer(reducer, initialState);

  const readProfile = async (token) => {

    const jwt = token || localStorage.getItem("jwt");

    if (!jwt) {
      dispatch({ type: "STOP_LOADING" });
      return;
    }

    await axios.get(`${VITE_AUTH_API_USER}`, { headers: { Authorization: `Bearer ${jwt}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          return dispatch({ type: "SET_LOGIN", payload: data.user })
        }
      })
      .catch((error) => {
        console.error("Error : ", error)
      })


  }

  useEffect(() => {
    readProfile();
  }, [])

  const handleLogout = () => {
    dispatch({ type: "SET_LOGOUT", ...state, })
    localStorage.removeItem("jwt");
    message.success("logout successful");
  }

  return (
    <Auth.Provider value={{ ...state, readProfile, handleLogout }}>
      {children}
    </Auth.Provider>
  )
}

export default AuthContext;

export const useAuthContext = () => useContext(Auth);