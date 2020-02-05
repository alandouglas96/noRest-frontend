import React from "react";
import ApisDisplay from "../../container/ApisDisplay/ApisDisplay";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import jwt from 'jsonwebtoken';

import './style.css';


const UserDashboard = () => {
  const token = localStorage.token; 
    const { name } = jwt.decode(token);
    console.log('NAME', name)
  return (
    <>
    {/*<div className="box flex-column align-center">*/}
    <div className="box flex-column">
      
      <div className="bread-crumb">
        <div className="bc"></div>
        <div className="flex">
          <Link to="/createApi">
            <Button color="primary" variant="contained"  style={{marginRight:'10px'}}>Create New Api</Button>
          </Link>
          <Link to="/account-settings">
            <Button color="secondary" variant="contained" >Account Settings</Button>
          </Link>
        </div>
      </div>
      <div className="box2">
      <div className='flex-column'>
        <div className="bigTitle">{name} APIs</div>
        <ApisDisplay />
      </div>
    </div>
      </div>
    </>
  );
};

export default UserDashboard;
