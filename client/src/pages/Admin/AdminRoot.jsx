import React from 'react'
import Navbarr from '../../components/Admin/Navbarr'
import { Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import AdminLogin from './AdminLogin'

const AdminRoot = () => {
    const [user] = useUserContext()
  return (
   <>
    <>
   {
    user?.isAdmin ? (
      <>
      <Navbarr/>
      <Outlet/>
      </>
    ) : (
      <AdminLogin/>
    )
   }
   </>
   </>
  )
}

export default AdminRoot