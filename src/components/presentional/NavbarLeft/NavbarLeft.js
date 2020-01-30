import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import logo from '../../../static/media/logo.png'

import './style.css';


function NavBarLeft (props) {
  switch (props.auth) {
    case null:
      return null;
    case false:
      return (
        <div className="NavBarItem">
          <Link to="/">
          <img className="logo" src={logo} alt="logo"/>
          </Link>
        </div>
      )
    default:
    return (
        <div className="NavBarItem">
          <Link to="/userDashboard">
           <img className="logo" src={logo} alt="logo"/>
          </Link>
        </div>
      )
    }
}


function mapStateToProps({ auth }) {
  // console.log('Auth->>>>>>>>>>>>>>', auth);

  return { auth };
}


export default connect(mapStateToProps,null)(NavBarLeft);
