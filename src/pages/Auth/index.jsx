import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './login'
import Register from './register'

const Auth = () => {
  return (
    <>
    <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
    </Routes>
    </>
  )
}

export default Auth