import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

function NavBarLeft (props) {

      return (
        <div className="NavBarItem">
          <Link to="/">
           <Button>noRest LOGO</Button>
          </Link>
        </div>
      ) 
}

export default NavBarLeft;
