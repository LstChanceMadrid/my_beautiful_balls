import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'


class UserNav extends Component {
	// constructor(props) {
	// 	super(props)
	// }

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
				<h1>User Nav</h1>
				
				<div  className="nav-links-container">
					<div><Link to = {`/${this.props.user.username}/home`}>Home</Link></div>
					<div><Link to = {`/${this.props.user.username}/my-cart`}>My Sack</Link></div>
					<div onClick={this.props.logout}><Link to ="/" >Logout</Link></div>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user : {
			username : state.user.username
		}
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout : () => dispatch(actionCreators.logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)