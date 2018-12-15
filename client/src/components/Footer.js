import React, { Component } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {
  render() {
    return (
      <footer>
          <h1>Footer</h1>
        <p>Copyright&copy; MyBeautifulBalls</p>
      </footer>
    )
  }
}

export default connect()(Footer)
