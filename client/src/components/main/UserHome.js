import React, { Component } from 'react'
import axios from "axios"
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actionCreators'


const REMOVE_BALL_URL = "http://localhost:5000/removeBall"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      balls : []    }
  }

  componentWillMount = () => {
    this.props.grabBalls()
  }

  componentWillUpdate = () => {
    this.props.grabBalls()
  }

  componentDidMount = () => {
    localStorage.removeItem('password')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('email')
  }

  removeBall = (id) => {
    console.log('removal')
    axios.post(REMOVE_BALL_URL, {
      id : id
    }).catch(e => console.log("Remove ball error",e))
  }

  render() {
    // console.log(this.props.cartItems)
    return (
      <div>
        {this.props.user.username}
        <section id="my-balls">
          { 
            this.props.balls ? this.props.balls.map(ball => {
              const myBallImage = () => {
                return {__html : ball.image}
              }
              return (
                <div key={ball.id}className="ball-container">
                  <div className="draw-container-user">
                    <div id={ball.id} className="draw-area-user" dangerouslySetInnerHTML={myBallImage()}></div>
                  </div>
                  <div className="ball-option-container">
                    <button onClick={() => this.removeBall(Number(ball.id))}>Remove</button>
                    <button type="submit" onClick={() => this.props.addToCart(Number(ball.id))}>Add to MyCart</button>
                  </div>
                </div>
              )
            }) : ""
          }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems : state.cartItems,
    user : {
      username : state.user.username
    },
    balls : state.balls
  }
}

const mapDispatchToProps = dispatch => {
  return {
    grabBalls : () => dispatch(actionCreators.grabBalls()),
    addToCart : (id) => dispatch(actionCreators.addToCart(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserHome)