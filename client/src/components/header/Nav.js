import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {

  
  render() {

    window.onscroll = () => {
			let navBar = document.getElementsByTagName('nav')
			if (window.scrollY > 30) {
				navBar[0].classList.add('sticky')
		} else {
			navBar[0].classList.remove('sticky')
		}
  }
    

    return (
      <nav className="nav-bar">
        <h1>Nav</h1>
        <div className="nav-links-container">
            <div><Link to = "/">Home</Link></div>
            <div><Link to = "/login">Log In</Link></div>
            <div><Link to = "/register">Register</Link></div>
        </div>
      </nav>
    )
  }
}
