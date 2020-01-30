import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./style.css";

const ApiCard = ({ apiInfo }) => {
  return (
    <>
      <div className="ApiCard">
        <div className="ApiCard-Name">{apiInfo.api_name}</div>
        <div className="ApiCard-Line"></div>
        <div className="ApiCard-Description">{apiInfo.description}</div>
        
        <div className="ApiCard-rowContainer">
          <div className="ApiCard-columnContainer">
            <div className="ApiCard-Rows">6,500 Rows</div>
            <div className="ApiCard-Button">
              <Link to={`/apiDetails/docs/${apiInfo.api_name}`}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    width: "150px",
                  }}
                >
                  DOCS
                </Button>
              </Link>
            </div>
          </div>
          <div className="ApiCard-columnContainer">
            <div className="ApiCard-Public">
              Status: {apiInfo.public ? "Public" : "Private"}
            </div>
            <div className="ApiCard-Button">
              <Link to={`/apiDetails/${apiInfo.api_name}`}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    width: "150px",
                  }}
                >
                 DETAILS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiCard;
