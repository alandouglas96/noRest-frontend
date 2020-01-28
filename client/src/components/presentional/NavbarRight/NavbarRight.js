import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import './style.css';

function NavBarRight (props) {
  function handleLogout () {
    localStorage.setItem('token', '');
    props.fetchUser();
  }

  switch (props.auth) {
    case null:
      return (

          <Link to="/login">
           <Button variant="outlined" color="primary">Not Server</Button>
          </Link>

      )
      case false:
    return (
      <div className="NavBarItem flex">
        <Link to="/login">
         <Button variant="outlined" color="primary">Login</Button>
        </Link>
        <div style={{width: '10px'}}></div>
        <Link to="/signUp">
         <Button variant="outlined" color="primary">Sign Up</Button>
        </Link>
      </div>
    )
    default:
      return (
        <div className="NavBarItem">
          <Link to="/">
           <Button variant="outlined" color="primary" onClick={handleLogout}>Log Out</Button>
          </Link>
        </div>
      )


  }
}
function mapStateToProps({ auth }) {
  console.log('Auth->>>>>>>>>>>>>>', auth);

  return { auth };
}


export default connect(mapStateToProps,actions)(NavBarRight);