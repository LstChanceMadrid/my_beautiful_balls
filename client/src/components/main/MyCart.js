import React, { Component } from 'react'
import Checkout from './Checkout'
import { connect } from 'react-redux';
import Quantity from './Quantity'

class MyCart extends Component {
  render() {
    
    return (
      <div className="cart-container">
        { this.props.cartItems ? this.props.cartItems.map(cartItem => {
            
            const cartItemImage = () => {
              return {__html : cartItem.image}
            }
            return (
              <div className="cart-item" key={cartItem.id}>
                <div  className="draw-container-user">
                  <svg className="draw-area-user" viewBox="0 0 472 295" dangerouslySetInnerHTML={cartItemImage()}></svg>
                </div>
                <Quantity id={cartItem.id} />
              </div>
            )
          }) : ""
        }
        <Checkout />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    cartItems : state.cartItems,
    totalPrice : state.totalPrice
  }
}

export default connect(mapStateToProps)(MyCart)