import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Contact from './Contact'

import Navbar from '@/components/Header/header'
import Footer from '@/components/Footer/footer'

const Frontend = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default Frontend