import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrawArea from './DrawArea'
import * as actionCreators from '../../store/actionCreators'


class Home extends Component {

  componentWillReceiveProps = () => {
    document.getElementById('hi').innerHTML = `<div id="draw-container-user"><div class="draw-area-user">${this.props.ballImage}</div></div>`

  }

  handleProp = () => {

  }


  render() {
    console.log(this.props.ballImage)
    return (
      <div>
        <h1>Home</h1>
        
          <DrawArea />

          <button onClick={this.props.saveBall}>save</button>
        <section id="hi"></section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    ballImage : state.ballImage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveBall : () => dispatch(actionCreators.saveBall())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
