
// export default connect(mapStateToProps)(Checkout)

//  _   _  ___ _____ _____
// | \ | |/ _ \_   _| ____|
// |  \| | | | || | |  _|
// | |\  | |_| || | | |___
// |_| \_|\___/ |_| |_____|
//
// This is just for demonstration purposes and does **NOT** necessarily
// represent security best practices.

import React from "react";
import StripeCheckout from "react-stripe-checkout";

const stripeApiKey = "pk_test_OSyusZepLTgA89ecvgVbG0IG";


const checkoutUrl = "https://asdf1234.sse.codesandbox.io/:username/charge";

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
        console.error(
          error,
          "You may need to refresh the server sandbox. It hibernates due to inactivity."
        );
      });
  };

  render() {
    const { show } = this.state;

    let amount = 500

    return (
      <div className="App">
        {stripeApiKey === "pk_test_publishable_key" ? (
          <p>Configure your Stripe test mode publishable key.</p>
        ) : (
          <React.Fragment>
            <h1>
              <span aria-label="balls image" role="img">
              🎾
              </span>
              Add Balls to your Sack!
            </h1>
            <div className="App__body">
              {show && (
                <>
                  
                  <StripeCheckout
                    allowRememberMe={false}
                    amount="500"
                    billingAddress
                    description={`Your balls are gonna cost $${amount}`}
                    // image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    // image="https://alligator.io/images/alligator-logo3.svg"
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
              
              <ul className="text-muted">
                <li>Credit Card Number: 4242 4242 4242 4242</li>
                <li>MM/YY: Any present or future date.</li>
                <li>CVC: Any three digits, e.g., 123.</li>
              </ul>
              
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Checkout