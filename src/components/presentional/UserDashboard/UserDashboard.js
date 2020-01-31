import React from "react";
import ApisDisplay from "../../container/ApisDisplay/ApisDisplay";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import BreadCrumb from '../../presentional/breadcrumps/apiDetailsBC';

import './style.css';


const UserDashboard = () => {
  return (
    <>
    {/*<div className="box flex-column align-center">*/}
    <div className="box flex-column">
      
      <div className="bread-crumb">
        <BreadCrumb/>
        <div className="flex">
          <Link to="/createApi">
            <Button color="primary" variant="contained" size="small" style={{marginRight:'10px'}}>Create New Api</Button>
          </Link>
          <Link to="/createApi">
            <Button color="secondary" variant="contained" size="small">Account Settings</Button>
          </Link>
        </div>
      </div>
      <div className="box2">
      <div className='flex-column'>
        <ApisDisplay />
      </div>
    </div>
      </div>
    </>
  );
};

export default UserDashboard;
