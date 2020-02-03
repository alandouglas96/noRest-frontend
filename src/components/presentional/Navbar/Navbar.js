import React, { useEffect } from 'react';
import NavBarRight from '../NavbarRight/NavbarRight';
import NavBarLeft from '../NavbarLeft/NavbarLeft';
import { connect } from "react-redux";
import { setPublicApisAction } from "../../../actions/";

import './style.css';


function NavBar (props) {
  const { setPublicApis } = props;

  useEffect(() => {
    setPublicApis();
  }, [setPublicApis]);

  return (
    <div className="NavBar">
        <NavBarLeft/>
        <NavBarRight/>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setPublicApis: () => dispatch(setPublicApisAction())
});



export default connect(null, mapDispatchToProps)(NavBar);
