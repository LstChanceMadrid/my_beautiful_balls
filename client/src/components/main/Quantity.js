import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'


class Quantity extends Component {
    state = {
        ...this.state,
        quantity : 0
    }

    componentWillUnmount = () => {
        this.props.changeQuantity(this.state.quantity)
    }

    changeQuantity = (e) => {
        this.setState({
        quantity : e.target.value
        })
    }


  render() {
    console.log(this.state.quantity)
    console.log(this.props.quantity)


    return (
      <div className="" key={this.props.id}>
        <div>Price: ${this.props.ballPrice/100}</div>
        <label>Quantity</label>
        <input className="quantity" onChange={this.props.changeQuantity} type="number" />
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        cartItems : state.cartItems,
        ballPrice : state.ball.price,
        totalPrice : state.totalPrice,
        quantity : state.quantity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeQuantity : (quan) => dispatch(actionCreators.changeQuantity(quan))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quantity)
