import React, { Component } from 'react'
import { connect } from 'react-redux'

class Main extends Component {
  
  render() {

    return (
      <main>
        <div className="nav-placeholder"></div>

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