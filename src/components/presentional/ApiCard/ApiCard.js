import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./style.css";

const ApiCard = ({ apiInfo }) => {
  return (
    <>
      <div className="ApiCard">
        <div className="ApiCard-Name">{apiInfo.api_name}</div>
        <div className="ApiCard-Description">{apiInfo.description}</div>
        <div className="ApiCard-Rows">6,500 rows (available in data??)</div>
        <div className="ApiCard-Public">
          Public: {apiInfo.public} (lock open/close)
        </div>

        <div className="ApiCard-Button">
          <Link to={`/apiDetails/docs/${apiInfo.api_name}`}>
            <Button
              size="small"
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#E85F48",
                width: "150px",
                height: "40px"
              }}
            >
              <span className="ApiDetails-head-button">DOCS</span>
            </Button>
          </Link>
        </div>
        <div className="ApiCard-Button">
          <Link to={`/apiDetails/${apiInfo.api_name}`}>
            <Button
              size="small"
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#175999",
                width: "150px",
                height: "40px"
              }}
            >
              <span className="ApiDetails-head-button">DETAILS</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ApiCard;
