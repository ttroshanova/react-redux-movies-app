import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = ({handleMenuBar, navbarActive}) => {
  return (
    <div className='header'>
      <Link to='/' className='logo'>Logo</Link>
      <div className={navbarActive ? 'nav active' : 'nav'}>
        <div className='nav-background'></div>
        <div className='menu-navigation'>
        <Link to='signin'>Sign In</Link>
        </div>
      </div>
      <div className='menubar' onClick={handleMenuBar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Header