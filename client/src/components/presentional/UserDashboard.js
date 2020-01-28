import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApisDisplay from "../container/ApisDisplay";


const UserDashboard = () => {
  return (
    <>
      <h1>User Dashboard</h1>
      <div style={{}}>
        <Link to="/createApi">
          <Button size="large" variant="outlined" color="primary">
            CREATE YOUR API
          </Button>
        </Link>
        <ApisDisplay />
      </div>
    </>
  );
};

export default UserDashboard;
