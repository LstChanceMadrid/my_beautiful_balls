
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux"
// import modules from '../../sensitive'

const stripeApiKey = module.stripeKey;


const checkoutUrl = "https://localhost:5000/:username/charge?ssl=true";

class Checkout extends React.Component {
  state = {
    show: true
  };


  /*::
  type Token = {
    id: string, // "tok_asdf123asdf123asdf123"
    object: "token",
    card: {
      id: string // "card_asdf123asdf123asdf123"
      object: "card"
      address_city: string, // "Anywhere"
      address_country: string, // "United States"
      address_line1: string, // "1234 Main St"
      address_line1_check: string, // "pass"
      address_line2: string, // `null`
      address_state: string, // "AL"
      address_zip: string, // "70000"
      address_zip_check: string, // "pass"
      brand: string, // "Visa"
      country: string, // "US"
      cvc_check: string, // "pass"
      dynamic_last4: null,
      exp_month: number, // 1
      exp_year: number, // 2019
      funding: string, // "credit"
      last4: string, // "4242"
      metadata: {
       ...
      },
      name: string, // "Bayou Bill"
      tokenization_method: null
    }
    client_ip: string, // "5.5.5.123"
    created: number, // 1540398618
    email: string, // "me@example.com"
    livemode: boolean, // false
    type: "card"
    used: boolean, // false
  }
  type Addresses = {
    billing_name: string, // "Bayou B Bill"
    billing_address_line1: string, // "1234 Main St"
    billing_address_city: string, // "Anywhere"
    billing_address_state: string, // "LA"
    billing_address_zip: string, // "70000"
    billing_address_country: string, // "United States"
    billing_address_country_code: string, // "US"
    shipping_name: string, // "Bayou S Bill"
    shipping_address_line1: string, // "1234 Main St"
    shipping_address_city: string, // "Anywhere"
    shipping_address_state: string, // "LA"
    shipping_address_zip: string, // "70000"
    shipping_address_country: string, // "United States"
    shipping_address_country_code: string, // "US"
  }
  */
  handleToken = (token, addresses) => {
    console.log("App#handleToken");
    console.log(token);
    console.log(addresses);

    const body = new FormData();
    // Send information to determine how to charge customer:

    // Send standard Stripe information:
    body.append("stripeEmail", token.email);
    body.append("stripeToken", token.id);
    body.append("stripeTokenType", token.type);

    body.append("stripeBillingName", addresses.billing_name || "");
    body.append(
      "stripeBillingAddressLine1",
      addresses.billing_address_line1 || ""
    );
    body.append("stripeBillingAddressZip", addresses.billing_address_zip || "");
    body.append(
      "stripeBillingAddressState",
      addresses.billing_address_state || ""
    );
    body.append(
      "stripeBillingAddressCity",
      addresses.billing_address_city || ""
    );
    body.append(
      "stripeBillingAddressCountry",
      addresses.billing_address_country || ""
    );
    body.append(
      "stripeBillingAddressCountryCode",
      addresses.billing_address_country_code || ""
    );

    body.append("stripeShippingName", addresses.shipping_name || "");
    body.append(
      "stripeShippingAddressLine1",
      addresses.shipping_address_line1 || ""
    );
    body.append(
      "stripeShippingAddressZip",
      addresses.shipping_address_zip || ""
    );
    body.append(
      "stripeShippingAddressState",
      addresses.shipping_address_state || ""
    );
    body.append(
      "stripeShippingAddressCity",
      addresses.shipping_address_city || ""
    );
    body.append(
      "stripeShippingAddressCountry",
      addresses.shipping_address_country || ""
    );
    body.append(
      "stripeShippingAddressCountryCode",
      addresses.shipping_address_country_code || ""
    );

    fetch(checkoutUrl, {
      method: "POST",
      body,
      mode: "cors"
    })
      .then(res => {
        console.log("response received");
        console.dir(res);
        return res.json();
      })
      .then(result => {
        console.log("result");
        console.log(result);
      })
      .catch(error => {
        console.log("error");
        console.error(error);
      });
  };

  render() {
    const { show } = this.state;

    return (
      <div className="App checkout">
        {stripeApiKey === "pk_test_publishable_key" ? (
          <p>Configure your Stripe test mode publishable key.</p>
        ) : (
          <React.Fragment>
            <h1>
              <span aria-label="balls image" role="img">
              🎾
              </span>
              Add Balls to your Cart!
            </h1>
            <div className="App__body">
              {show && (
                <>
                  
                  <StripeCheckout
                    allowRememberMe={false}
                    amount={this.props.totalPrice}
                    billingAddress
                    description={`Your balls are gonna cost $${this.props.totalPrice}`}
                    image='https://upload.wikimedia.org/wikipedia/commons/d/db/Sports_portal_bar_icon.png'
                    label="Pay with 💳"
                    locale="auto"
                    name="MyBeautifulBalls"
                    panelLabel="Order your Beautiful Balls"
                    // shippingAddress
                    stripeKey={stripeApiKey}
                    token={this.handleToken}
                    zipCode
                  />
                </>
              )}
              <br />
              <br />
              <br />
              <br />
              <div>Everything is only $100!</div>
              <div>Limited Time Only!!!</div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalPrice : state.totalPrice,
    cartItems : state.cartItems
  }
}

export default connect(mapStateToProps)(Checkout)