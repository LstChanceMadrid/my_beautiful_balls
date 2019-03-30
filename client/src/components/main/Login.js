import React, { Component } from 'react'
import {connect} from 'react-redux'

import * as actionCreators from '../../store/actionCreators'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user : {
        username : null,
        password : null
      }
    }
  }

  componentWillUpdate = () => {
    localStorage.setItem('username', this.state.user.username)
    localStorage.setItem('password', this.state.user.password)
  }
  
  componentWillUnmount = () => {
    localStorage.removeItem('password')
  }

  handleUsernameChange = (e) => {
    this.setState({
       user: {
        ...this.state.user, 
        username : e.target.value
      }
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
       user: {
        ...this.state.user, 
        password : e.target.value
      }
    })  
  }

  render() {
    localStorage.setItem('username', this.state.user.username)
    localStorage.setItem('password', this.state.user.password)

    return (
      <div className="login-page">
        <fieldset className="login-fieldset">
          <legend className="fieldset-legend">Login</legend>
        
        <input id="username" className="login-input" type="text" name="username" onChange={this.handleUsernameChange} placeholder="Username" autoFocus />

        <input id="password" className="login-input" type="password" name="password" onChange={this.handlePasswordChange} placeholder="Password" />

        <button className="login-button" type="submit" onClick={this.props.login}>Log In</button>
        </fieldset>
      </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    login : () => dispatch(actionCreators.authenticateLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)