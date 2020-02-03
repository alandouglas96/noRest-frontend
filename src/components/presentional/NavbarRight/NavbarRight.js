import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import './style.css';

function NavBarRight (props) {
  function handleLogout () {

    actions.resetUserApis();
    
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
         <Button variant="contained" color="primary">Login</Button>
        </Link>
        <div style={{width: '10px'}}></div>
        <Link to="/signUp">
         <Button variant="contained" color="secondary">Sign Up</Button>
        </Link>
      </div>
    )
    default:
      return (
        <div className="NavBarItem">
          <div className="linkStyle">Home</div>
          <Link to="/public-apis">
            <div className="linkStyle">Public APIs</div>
          </Link>
          <div className="linkStyle">Features</div>
          <Link to="/">
           <Button variant="contained" color="primary" onClick={handleLogout}>Log Out</Button>
          </Link>
        </div>
      )
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps,actions)(NavBarRight);
