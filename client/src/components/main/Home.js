import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {

  
  render() {

    return (
      <div>
        <h1>Home</h1>

        <div>
          <h2>rugby ball pictures</h2>
        </div>
      </div>
    )
  }
}


export default connect()(Home)
