import React, { Component } from 'react'
import {connect} from 'react-redux'

class UserHome extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount = () => {
    localStorage.removeItem('password')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
  }


  render() {
    return (
      <div>
        {this.props.user.username}
        <h1>User Home</h1>
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

export default connect(mapStateToProps)(UserHome)