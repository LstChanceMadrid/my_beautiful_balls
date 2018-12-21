import React, { Component } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {
  render() {
    return (
      <footer>
        <h1>&copy;Copyright</h1>
        <h1>MyBeautifulBalls</h1>
      </footer>
    )
  }
}

export default connect()(Footer)