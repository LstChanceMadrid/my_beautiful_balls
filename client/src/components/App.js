import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/App.css';

import Footer from "./Footer"
import Header from "./Header"
import Home from './main/Home'
import Login from './main/Login'
import Main from "./Main"
import MyCart from './main/MyCart'
import Register from './main/Register'
import UserHome from './main/UserHome'


class App extends Component {



  render() {
    if (localStorage.getItem('jsonwebtoken')) {
      return (
        <div>
          <Header />
          <Main>
            <Switch>
              <Route path="/:username/home" component={UserHome} />
              <Route path="/:username/my-cart" component={MyCart} />
            </Switch>
          </Main>

          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Main>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route path="/*" component={Home} />
            </Switch>
          </Main>

          <Footer />
        </div>
      );
    }
  } 
}

export default App;
