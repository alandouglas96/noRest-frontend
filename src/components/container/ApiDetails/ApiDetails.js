import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import "./style.css";
import ApiTable from '../../presentional/ApiDetailsTable'

const ApiDetails = (props) => {

  const { location } = props;
  // determines whether route is that of a public view mode api or not
  const path = location.pathname;
  const regex = RegExp('/public-apis/.*');
  const publicDetails = regex.test(path);
  // const publicDetails = location.pathname.test(/\/public-apis\/.*/);

  // depending on the test gets current API from publicApis state or from user
  // apis.
  let apiName='';
  let currentApi='';
  if (publicDetails) {
    const { publicApis } = props;
    apiName = props.match.params.apiName;
    if (publicApis.length) {
     currentApi = publicApis.find(api => api.api_name === apiName)
    }
    if (!currentApi) return null;
  } else {
    const { userApis } = props;
    apiName = props.match.params.apiName;
    currentApi = userApis.find(api => api.api_name === apiName)
    if (!currentApi) return null;
  }

  return (
    <>
      <div className=" box">
        <div className="bread-crumb">
        <div className="bc">Dashboard / API Details</div>
          <div className="flex">
            <Link to={`/apiPostman/${currentApi.api_name}`}>
              <Button variant="contained" color="primary" style={{marginRight:'5px'}}>
                API Data
              </Button>
            </Link>
            { publicDetails 
              ? 
                '' 
              :
                <Link to={`/apiDetails/edit/${apiName}`}>
                  <Button variant="contained" color="primary"  style={{marginRight:'5px'}}>
                    Edit API
                  </Button>
                </Link>
            }
            <Link to={`/userDashboard`}>
              <Button variant="contained" color="secondary">
                Back
              </Button>
            </Link>
            </div>
          </div>
        <div className="box2">
        <div className="flex" style={{width:'100%'}}>
          <div style={{width:'100%'}}>
             <div className="bigTitle"> {currentApi.api_name}
            </div>
            <div className="margin-top">
              <span className="title2">API Endpoint:{" "}</span>
              <span className="title3">https://no-rest-api.herokuapp.com/api/{currentApi.api_name}</span>
            </div>
          { publicDetails
            ? 
              'As a Public API you can do GET requests without any type of API KEY'
            :
              <div className="flex align-center justify-center" style={{minWidth:'100%'}}>
                <div className="ApiDetails-credential-box">
                  <div className="title2 white-underline">Your API Credentials</div>
                  <div className="margin-top">
                    <span className="title4 bold">API SECRET KEY:{" "}</span>
                    <span className="title4">{currentApi.api_secret_key}</span>
                  </div>
                  <div>
                    <span className="title4 bold">API KEY:{" "}</span>
                    <span className="title4">{currentApi.api_key}</span>
                  </div>
                </div>
              </div>
           }
          </div>
        </div>
        <div>
          {currentApi.description ? <><span className="title2">API Description: </span>
          <span className="title3">{currentApi.description}</span></> : null}
        </div>

        <div className="flex-column">
          <div className="ApiDetails-credential-box">
            <Grid container direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}>
              <Grid item xs={12}>
                <div className="title2 white-underline">Your API Methods</div>
              </Grid>
              <Grid item xs={2}>
                <span className="title2">GET</span>
              </Grid>
              <Grid item xs={10}>
                <span className="title4">
                  Returns a JSON Object with ALL the data in you database
                </span>
              </Grid>
              <Grid item xs={2}>
                <span className="title2">GET/field/id</span>
              </Grid>
              <Grid item xs={10}>
                <span className="title4">
                Returns a JSON Object with all the rows whose #field column value is equal to #name
                </span>
              </Grid>
              { publicDetails
                ?
                  ''
                :
                  <>
                    <Grid item xs={2}>
                      <span className="title2">PUT/id</span>
                    </Grid>
                    <Grid item xs={10}>
                      <span className="title4">
                        Send in the body a JSON object with the ID to update the record
                      </span>
                    </Grid>
                    <Grid item xs={2}>
                      <span className="title2">POST</span>
                    </Grid>
                    <Grid item xs={10}>
                      <span className="title4">
                        Send in the body a JSON Object which will be input in the DB
                      </span>
                    </Grid>
                    <Grid item xs={2}>
                      <span className="title2">DELETE/id</span>
                    </Grid>
                    <Grid item xs={10}>
                      <span className="title4">
                        Deletes the record with such ID and returns the deleted record
                      </span>
                    </Grid>
                  </>
              }
            </Grid>
          </div>
          </div>
          <div style={{marginBottom: '20px'}}>
            <span className="title2">API Structure: </span>
          </div>
          <ApiTable apiFields={currentApi.api_fields}/>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  userApis: state.userApis.userApis,
  publicApis: state.publicApis
});

export default connect(mapStateToProps, null)(ApiDetails);

