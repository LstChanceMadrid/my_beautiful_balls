import React, { Component } from 'react'
import { connect } from 'react-redux'

class Main extends Component {
  
  render() {

    return (
      <main>
        <div className="nav-placeholder"></div>

        <h1>Opening Day Sale!!! All Balls for Only $100!!</h1>

        {this.props.children}
      </main>
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

export default connect(mapStateToProps)(Main)