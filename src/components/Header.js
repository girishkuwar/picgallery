import React from 'react'
import logo from '../assets/logo.png'
import styles from "./components.module.css"
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav className={styles.nav}>
      <div className={styles.navlist}>
          <ul>
            <li><NavLink to="/">Profile</NavLink></li>
            <li><a href="#">Settings</a></li>
            <li><NavLink to="/uploadpage">Upload</NavLink></li>
          </ul>
        </div>
        <div className={styles.logo}>
        <NavLink to="/feeds"> <img src={logo} alt="" /> </NavLink>
        </div>
        <div className={styles.navlist}>
          <ul>
            <li><a href="#">Change</a></li>
            <li><a href="#">password</a></li>
            <li><a href="#">signout</a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header