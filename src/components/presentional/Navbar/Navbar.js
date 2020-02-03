import React, { useEffect } from 'react';
import NavBarRight from '../NavbarRight/NavbarRight'
import NavBarLeft from '../NavbarLeft/NavbarLeft'
import { connect } from "react-redux";
import { fetchUserApisAction } from "../../../actions/";

import './style.css';


function NavBar (props) {
  // const { fetchUserApis } = props;
  // useEffect(() => {
  //   fetchUserApis();
  // }, [fetchUserApis]);

  return (
    <div className="NavBar">
        <NavBarLeft/>
        <NavBarRight/>
    </div>
  )
}

const mapStateToProps = state => ({
  // userApis: state.userApis  // Needed???
});

const mapDispatchToProps = dispatch => ({
  fetchUserApis: () => dispatch(fetchUserApisAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
