import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

function NavBar (props) {
  switch (props.auth) {
    case null:
      return (
        <div className="NavBar">
          <Link to="/login">
           <Button>Not Server</Button>
          </Link>
        </div>
      )
      case false:
    return (
      <div className="NavBar">
        <Link to="/login">
         <Button>Login</Button>
        </Link>
        <Link to="/createApi">
         <Button>Create Api</Button>
        </Link>
      </div>
    )
    default:
      return (
        <div className="NavBar">
          <Link to="/login">
           <Button>Logged</Button>
          </Link>
          <Link to="/createApi">
           <Button>Create Api</Button>
          </Link>
        </div>
      )


  }
}
function mapStateToProps({ auth }) {
  console.log('Auth->>>>>>>>>>>>>>', auth);
  
  return { auth };
}

export default connect(mapStateToProps)(NavBar);