import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApisDisplay from "../../container/ApisDisplay/ApisDisplay";

import './style.css';


const UserDashboard = () => {
  return (
    <>
    <div className="box flex-column align-center">
      <h1>User Dashboard</h1>
      <div className='UserDashboard-test'>
        <Link to="/createApi">
          <Button size="large" variant="outlined" color="primary">
            CREATE NEW API
          </Button>
        </Link>
        <ApisDisplay />
      </div>
      </div>
    </>
  );
};

export default UserDashboard;
