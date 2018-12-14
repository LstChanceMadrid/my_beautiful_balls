import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actionCreators'




class Register extends Component {

    state = {
        user : {}
    }

    componentWillUpdate = () => {
        localStorage.setItem('username', this.state.user.username)
        localStorage.setItem('firstname', this.state.user.firstname)
        localStorage.setItem('lastname', this.state.user.lastname)
        localStorage.setItem('email', this.state.user.email)
        localStorage.setItem('password', this.state.user.password)
      }

    handleTextBoxChange = (e) => {
        this.setState({
            user : {
                ...this.state.user,
                [e.target.name] : e.target.value
            }
        })
    }

    render() {
        localStorage.setItem('username', this.state.user.username)
        localStorage.setItem('firstname', this.state.user.firstname)
        localStorage.setItem('lastname', this.state.user.lastname)
        localStorage.setItem('email', this.state.user.email)
        localStorage.setItem('password', this.state.user.password)
      
        return (
            <div>
                <h1>Register</h1>

                <div className="register-form-container">
                    <div className="input-container">
                        <label className="register-label">Username:</label>
                        <input className="register-input" type="text" name="username" onChange={this.handleTextBoxChange} placeholder="Username" autoFocus />
                    </div>

                    <div className="input-container">
                        <label className="register-label">First Name:</label>
                        <input className="register-input" type="text" name="firstname" onChange={this.handleTextBoxChange} placeholder="First Name" />
                    </div>

                    <div className="input-container">
                        <label className="register-label">Last Name:</label>
                        <input className="register-input" type="text" name="lastname" onChange={this.handleTextBoxChange} placeholder="Last Name" />
                    </div>

                    <div className="input-container">
                        <label className="register-label">Email:</label>
                        <input className="register-input" type="email" name="email" onChange={this.handleTextBoxChange} placeholder="Email" />
                    </div>

                    <div className="input-container">
                        <label className="register-label">Password:</label>
                        <input className="register-input" type="text" name="password" onChange={this.handleTextBoxChange} placeholder="Password" />
                    </div>

                    <div className="input-container">
                        <input type="submit" onClick={this.props.register} value="Register" />
                    </div>
                </div>
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
        register : () => dispatch(actionCreators.registerUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)