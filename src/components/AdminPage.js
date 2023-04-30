import React from 'react'
import AdminLogin from './AdminLogin'
import { Footer } from './Footer'
import NavbarTop from './Navbar'

export default function AdminPage() {
  return (
    <div>
        <NavbarTop/>
        <AdminLogin/>
        <Footer/>
    </div>
  )
}
