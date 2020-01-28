import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../actions';

function NavBarRight (props) {
function handleLogout () {
  localStorage.setItem('token', '');
  props.fetchUser();

}
  

  switch (props.auth) {
    case null:
      return (
        
          <Link to="/login">
           <Button>Not Server</Button>
          </Link>
    
      )
      case false:
    return (
      <div className="NavBarItem">
        <Link to="/login">
         <Button>Login</Button>
        </Link>
        <Link to="/signUp">
         <Button>Sign Up</Button>
        </Link>
      </div>
    )
    default:
      return (
        <div className="NavBarItem">
          <Link to="/">
           <Button onClick={handleLogout}>Log Out</Button>
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