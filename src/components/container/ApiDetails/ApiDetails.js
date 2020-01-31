import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApiDataTable from "../../presentional/ApiDataTable/";
import "./style.css";

const ApiDetails = (props) => {
  const { userApis } = props;
  const apiName = props.match.params.apiName;
  const currentApi = userApis.find(api => api.api_name === apiName)

  if (!currentApi) return null;


  return (
    <>
      <div className=" box">
      <div className="bigTitle">API DETAILS</div>
        <div className="ApiDetails-head">
          <div className="ApiDetails-head-item ApiDetails-head-name">
          {currentApi.api_name}
          </div>
          <div className="ApiDetails-head-item ApiDetails-head-endpoint">
            Endpoint:
            <span className="ApiDetails-head-endpoint-span">
              https://no-rest-api.herokuapp.com/api/{currentApi.api_name}
            </span>
          </div>
          <div className="ApiDetails-head-item">
          <Link to={`/apiDetails/docs/${currentApi.api_name}`}>
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
          <div className="ApiDetails-head-item">
            <Link to={`/apiDetails/edit/${apiName}`}>
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
                <span className="ApiDetails-head-button">EDIT API</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="ApiDetails-description">
          {currentApi.description}
        </div>
        <div className="ApiDetails-latestData">
          <div className="ApiDetails-title">Latest Data</div>
          <ApiDataTable api={currentApi.api_name} />
        </div>
        <div className="ApiDetails-apiMethods">
          <div className="ApiDetails-title">Your API Methods</div>
          <div className="ApiDetails-apiMethods-method">
            <div className="ApiDetails-apiMethods-method-name">GET</div>
            <span className="ApiDetails-apiMethods-method-span">
              Returns a JSON Object with ALL the data in you database
            </span>
          </div>
          <div className="ApiDetails-apiMethods-method">
            <div className="ApiDetails-apiMethods-method-name">
              GET/field/id
            </div>{" "}
            <span className="ApiDetails-apiMethods-method-span">
              Returns a JSON Object with all the rows whose #field column value
              is equal to #name
            </span>
          </div>
          <div className="ApiDetails-apiMethods-method">
          <div className="ApiDetails-apiMethods-method-name">POST</div>
            <span className="ApiDetails-apiMethods-method-span">
              Send in the body a JSON Object which will be input in the DB
            </span>
          </div>
          <div className="ApiDetails-apiMethods-method">
            <div className="ApiDetails-apiMethods-method-name">PUT/id</div>
            <span className="ApiDetails-apiMethods-method-span">
              Send in the body a JSON object with the ID to update the record
            </span>
          </div>
          <div className="ApiDetails-apiMethods-method">
            <div className="ApiDetails-apiMethods-method-name">DELETE/id</div>
            <span className="ApiDetails-apiMethods-method-span">
              Deletes the record with such ID and returns the deleted record
            </span>
          </div>
        </div>
        <div className="ApiDetails-apiCredentials">
          <div className="ApiDetails-title">Your API Credentials</div>
          <div className="ApiDetails-apiCredentials-item">
            <span className="ApiDetails-apiCredentials-item-title">
              API KEY :
            </span>
            <span className="ApiDetails-apiCredentials-item-content">
            {currentApi.api_key}
            </span>
          </div>
          <div className="ApiDetails-apiCredentials-item">
            <span className="ApiDetails-apiCredentials-item-title">
              API SECRET KEY :
            </span>
            <span className="ApiDetails-apiCredentials-item-content">
            {currentApi.api_secret_key}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  userApis: state.userApis.userApis
});

export default connect(mapStateToProps, null)(ApiDetails);

