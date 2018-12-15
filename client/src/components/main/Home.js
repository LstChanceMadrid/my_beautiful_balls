import React, { Component } from 'react'
import { connect } from 'react-redux'
import  ball from '../../styles/ballcanvas.png'
import DrawArea from './DrawArea'


class Home extends Component {

  draw = () => {
    // document.getElementById('drawball') = `../../styles/download.jpeg`
  }
  render() {
    
    return (
      <div>
        <h1>Home</h1>
        <DrawArea />
      </div>
    )
  }
}


export default connect()(Home)
