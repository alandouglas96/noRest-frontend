import React from "react";
import ApisDisplay from "../../container/ApisDisplay/ApisDisplay";

import './style.css';


const UserDashboard = () => {
  return (
    <>
    <div className="box flex-column align-center">
      <div className='userDashboard-header'>
        <span className='userDashboard-header-item'>Your APIs</span>
        <span className='userDashboard-header-item'>Account Settings</span>
        <span className='userDashboard-header-item searchBar'>Search Bar</span>
      </div>
      <div className='UserDashboard-display'>
        <ApisDisplay />
      </div>
      </div>
    </>
  );
};

export default UserDashboard;
