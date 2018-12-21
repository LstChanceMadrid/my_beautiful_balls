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
    localStorage.removeItem('username')
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
      <div>
        <h1>Login</h1>

        <input id="username" type="text" name="username" onChange={this.handleUsernameChange} placeholder="Username" autoFocus />

        <input id="password" type="text" name="password" onChange={this.handlePasswordChange} placeholder="Password" />

        <button type="submit" onClick={this.props.login}>Log In</button>
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