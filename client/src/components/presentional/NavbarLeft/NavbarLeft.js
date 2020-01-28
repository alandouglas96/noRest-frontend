import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import './style.css';


function NavBarLeft (props) {
  switch (props.auth) {
    case null:
      return null;
    case false:
      return (
        <div className="NavBarItem">
          <Link to="/">
           <Button>noRest LOGO</Button>
          </Link>
        </div>
      )
    default:
    return (
        <div className="NavBarItem">
          <Link to="/userDashboard">
           <Button>noRest LOGO</Button>
          </Link>
        </div>
      )
    }
}


function mapStateToProps({ auth }) {
  console.log('Auth->>>>>>>>>>>>>>', auth);

  return { auth };
}


export default connect(mapStateToProps,null)(NavBarLeft);
