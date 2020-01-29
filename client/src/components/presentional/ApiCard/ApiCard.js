import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./style.css";

const ApiCard = ({ apiInfo }) => {
  return (
    <>
      <div className="ApiCard-test">
        <Link to={`/apiDetails/${apiInfo.api_name}`}>
        <Button size="large" variant="outlined" color="green">
          <div>Name: {apiInfo.api_name}</div>
          <div>Description: {apiInfo.description}</div>
          <div>Created at: {apiInfo.date_created}</div>
          <div>Last Update: {apiInfo.date_last_updated}</div>
          <div>Public: {apiInfo.public}</div>
        </Button>
        </Link>
      </div>
    </>
  );
};

export default ApiCard;
