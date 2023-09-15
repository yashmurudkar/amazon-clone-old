import './App.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [ { user } , dispatch] = useStateValue()

  console.log('User from DataLayer:' , user)

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The User is >>> ', authUser)
      if (authUser) {
        // the user just  logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        //the user is logged out
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

        <Routes>
          <Route exact path="/login" element={
            <React.Fragment>
              <Login />
            </React.Fragment>
          } />
          <Route exact path="/checkout" element={
            <React.Fragment>
              <Header />
              <Checkout />
            </React.Fragment>
          } />
          <Route exact path="/" element={
            <React.Fragment>
              <Header />
              <Home />
            </React.Fragment>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
