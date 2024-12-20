import React from 'react'
import Header from '../UI/Header/header'
import Footer from '../UI/Footer/footer'
import { Outlet } from 'react-router-dom'; // Import Outlet



const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen ' >
        <Header/>
          <main className='flex-grow bg-blue-50 p-4 text-center'> <Outlet /></main>
        <Footer/>
    </div>
  )
}

export default Layout