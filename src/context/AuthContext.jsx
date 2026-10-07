import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const Auth = createContext();

const initialState = { isAuth: false, user: {}, isAppLoading: false };

const reducer = (state, action) => {

  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, isAuth: true, user: action.payload };
    case "SET _LOGOUT":
      return { isAuth: false, user: {}, isAppLoading: false };
    default:
      state;
  }

}

const AuthContext = ({ children }) => {

  const VITE_AUTH_API_USER = import.meta.env.VITE_AUTH_API_USER

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true)

  const readProfile = async () => {

    const jwt = localStorage.getItem("jwt");

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
      .finally(() => {
        setIsAppLoading(false)
      })

  }

  useEffect(() => {
    readProfile();
  }, [])

  return (
    <Auth.Provider value={{ ...state, readProfile }}>
      {children}
    </Auth.Provider>
  )
}

export default AuthContext;

export const useAuthContext = () => useContext(Auth);