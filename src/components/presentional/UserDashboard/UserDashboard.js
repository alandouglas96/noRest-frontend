import React from "react";
import ApisDisplay from "../../container/ApisDisplay/ApisDisplay";

import './style.css';


const UserDashboard = () => {
  return (
    <>
    {/*<div className="box flex-column align-center">*/}
    <div className="box flex-column">
      <div className='flex justify-center' style={{marginBottom: '50px'}}>
        <span className='boldTitle' style={{marginRight:'20px'}}>Your APIs</span>
        <span className='boldTitle'>Account Settings</span>
        {/*<span className='userDashboard-header-item searchBar'>Search Bar</span>*/}
      </div>
      <div className='flex-column'>
        <ApisDisplay />
      </div>
      </div>
    </>
  );
};

export default UserDashboard;
