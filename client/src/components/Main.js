import React, { Component } from 'react'
import { connect } from 'react-redux'

class Main extends Component {
  
  render() {

    return (
      <main>
        <div className="nav-placeholder"></div>

        <h1>Content</h1>

        {this.props.children}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username : state.username
  }
}

export default connect(mapStateToProps)(Main)