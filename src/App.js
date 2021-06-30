import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import Checkout from './Checkout';
import Payment from "./Payment";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import CreateProduct from "./CreateProduct";


const promise = loadStripe(
  'pk_test_51J2rQOF33e4KnOWFOSTmbwdoydiAoZjENJ0pfLuEGsmR2HRbKLISp8EH3OTwt5g7RuUQAkIAbwVTf6VIaq4w2xlK00Jypsa6HB'
  );

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect( () => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if (authUser) {
        // the user just logged in /the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

          {/* Create Product */}
          <Route path="/createProduct" >
            <Header />
            <CreateProduct />
          </Route>    

          {/* Orders */}
          <Route path="/orders" >
            <Header />
            <Orders />
          </Route>          

          {/* Login */}
          <Route path="/login" >
            <Login />
          </Route>

          {/* Checkout */}
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          {/* Payment */}
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          {/* Home */}
          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
