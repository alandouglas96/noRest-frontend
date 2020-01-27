import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function NavBar () {
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
}

export default NavBar;