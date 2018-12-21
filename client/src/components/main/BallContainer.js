import React, { Component } from 'react'
import { connect } from 'react-redux'





class BallContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state
        }
    }





    removeBall = (id) => {
        console.log('trying to remove balls')
        // axios.post(REMOVE_BALL_URL, {
        //   id : id
        // })
      }


  render() {
      let balls = this.props.balls

console.log(balls)
    return (
      <div>
        <div className="ball-container">
        <div className="draw-container-user">
          <svg className="draw-area-user" viewBox="0 0 472 295">{balls.image}</svg>
        </div>
        <div className="ball-option-container">
          <button type="submit" onClick={this.removeBall(balls.id)}>Remove</button>
          <button type="submit">Add to MyCart</button>
        </div>
      </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
    return {
        ...state,
        balls : state.balls
    }
}

export default connect(mapStateToProps)(BallContainer)