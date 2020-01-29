import React from 'react';
import NavBarRight from '../NavbarRight/NavbarRight'
import NavBarLeft from '../NavbarLeft/NavbarLeft'

import './style.css';


function NavBar (props) {

  return (
    <div className="NavBar">
      <div className="NavBarWidt">
        <NavBarLeft/>
        <NavBarRight/>
      </div>
    </div>
  )
}

export default NavBar;
