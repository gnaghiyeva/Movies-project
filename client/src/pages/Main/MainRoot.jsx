import React from 'react'
import Navbar from '../../components/Main/Navbar'
import { Outlet } from 'react-router-dom'

const MainRoot = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default MainRoot