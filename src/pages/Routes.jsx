import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '@/context/AuthContext'
import ProtectedRoutes from '@/private/ProtectedRoutes'

const Index = () => {

  const { isAuth } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
        <Route path='/dashboard/*' element={<ProtectedRoutes Component={Dashboard} />} />
      </Routes>
    </>
  )
}

export default Index