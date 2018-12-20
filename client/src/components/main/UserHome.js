import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actionCreators'

class UserHome extends Component {
  // constructor(props) {
  //   super(props)

  // }

  state = {
    ballsElement: null
  }

  componentDidMount = () => {
    localStorage.removeItem('password')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
  }

  componentDidUpdate = () => {
    console.log(this.props.balls)
    let balls = this.props.balls
    for (let ball in balls) {
      document.getElementById('my-balls').insertAdjacentHTML('beforeend', `<div id="draw-container-user"><div class="draw-area-user">${balls[ball]}</div></div>`)
    }
    

  }

  render() {
    return (
      
      <div>
        
        {this.props.user.username}
        <section id="my-balls"></section>
        <h1>User Home</h1>
        <button onClick={this.props.grabBalls}>Balls</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : {
      username : state.user.username
    },
    balls : state.balls
  }
}

const mapDispatchToProps = dispatch => {
  return {
    grabBalls : () => dispatch(actionCreators.grabBalls())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserHome)