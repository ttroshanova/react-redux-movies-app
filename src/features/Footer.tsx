import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <ul>
        <li><Link to='/'>FAQ</Link></li>
        <li><Link to='/'>Help Center</Link></li>
        <li><Link to='/'>Account</Link></li>
        <li><Link to='/'>Media Center</Link></li>
        <li><Link to='/'>Investor Relations</Link></li>
        <li><Link to='/'>Jobs</Link></li>
        <li> <Link to='/'>Ways to Watch</Link></li>
        <li><Link to='/'>Terms of Use</Link></li>
        <li> <Link to='/'>Privacy</Link></li>
        <li> <Link to='/'>Cookie Preferences</Link></li>
        <li> <Link to='/'>Corporate Information</Link></li>
        <li> <Link to='/'>Contact Us</Link></li>
        <li> <Link to='/'>Speed Test</Link></li>
        <li><Link to='/'>Legal Guarantee</Link></li>
        <li><Link to='/'>Legal Notices</Link></li>
        <li><Link to='/'>Only on Logo</Link></li>
      </ul>
    </div>
  )
}

export default Footer