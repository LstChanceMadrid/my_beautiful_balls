import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ...this.state,
        complete: false,
        pending: false
    };
    this.submit = this.submit.bind(this);
  }

  reviewPurchase = () => {
      this.setState({
          ...this.state,
          pending : true,
      })
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(token)
    });
    if (response.ok) this.setState({...this.state, complete: true})  }

  render() {
    if (this.state.pending) {
        return (
            <div className="checkout">
            <h2>Review your order and then hit "Submit"</h2>
            <button onClick={this.submit}>Submit</button>
            </div>
        )
    }
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);