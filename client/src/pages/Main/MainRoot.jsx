import React from 'react'
import Navbar from '../../components/Main/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Main/Footer'
import Subscribe from '../../components/Main/Subscribe'

const MainRoot = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Subscribe/>
    <Footer/>
    </>
  )
}

export default MainRoot