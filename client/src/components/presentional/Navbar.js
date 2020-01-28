import React from 'react';
import NavBarRight from './NavbarRight'
import NavBarLeft from './NavbarLeft'


function NavBar (props) {

  return (
    <div className="NavBar">
    <NavBarLeft/>
      <NavBarRight/>
    </div>
  )
}

export default NavBar;
