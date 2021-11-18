import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'
import logo from './HeaderImages/logo.png'

export default function Header({ user }) {


  let link1 = user ? "#" : "/sign-up";
  let link2 = user ? "/logout" : "sign-in";
  let link2Text = user ? "Logout" : "Login";

  return (
    <div className="header__container">
      <div className="logo__container">
        <img className="logo" src={logo} alt="logo" />
        <div className="title">
          <h1>MOVIE SAVER</h1>
        </div>
      </div>



      <div className="links__container">
        <ul className="nav__links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/get-all-favorites">Favorites</Link>
          </li>
          <li>
            <Link to={link2}>{link2Text}</Link>
          </li>
          <li>
            <Link to={link1}>{user ? user.name :
              <button id="sign__up__nav">Sign-Up</button>}</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
