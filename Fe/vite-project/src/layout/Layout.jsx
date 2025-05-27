import React from 'react'
import Header from './Header'
import NavBar from './NavBar'

function Layout({ children }) {
  return (
    <>
    <Header />
    <NavBar />
      {children}
    </>
  )
}

export default Layout
