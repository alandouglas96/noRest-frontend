import React from 'react';
import NavBarRight from '../NavbarRight/NavbarRight'
import NavBarLeft from '../NavbarLeft/NavbarLeft'

import './style.css';


function NavBar (props) {

  return (
    <div className="NavBar">
        <NavBarLeft/>
        <NavBarRight/>
    </div>
  )
}

export default NavBar;
