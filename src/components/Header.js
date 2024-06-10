import React, { useRef } from 'react'
import logo from '../assets/logo.png'
import styles from "./components.module.css"
import { NavLink } from 'react-router-dom'

const Header = () => {
  const auth = localStorage.getItem("userid");
  
  const signOut = () => {
    localStorage.removeItem("userid");
    window.location.reload();
  }

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navlist}>
          <ul>
            <li><NavLink to="/acc">Profile</NavLink></li>
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
            {(auth) ? <li onClick={signOut}><a href="#">signout</a></li> : <li><a href="/">singin</a></li>}

          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header