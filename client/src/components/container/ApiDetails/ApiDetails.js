import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApiDataTable from '../../presentional/ApiDataTable/'
import './style.css';


const ApiDetails = ({match}) => {

  const apiName = match.params.apiName

  // FETCH THE API WITH THIS NAME?? OR GET IT FROM REDUX

  return (
    <>
      <h1>API DETAILS</h1>
      <div className='ApiDetails-test'>
        <div className='ApiDetails-head'>
          <div className='ApiDetails-head-item ApiDetails-head-name'>
            {apiName}
          </div>
          <div className='ApiDetails-head-item ApiDetails-head-endpoint'>
            Endpoint: <span className='ApiDetails-head-endpoint-span'>asdfgljndsgndld</span>
          </div>
          <div className='ApiDetails-head-item'>
          <Link to={`/apiDetails/docs/${apiName}`}>
            <Button size="small" variant="outlined" color="secondary">
              <h1>DOCS</h1>
            </Button>
          </Link>
          </div>
          <div className='ApiDetails-head-item'>
          <Link to={`/apiDetails/edit/${apiName}`}>
            <Button size="small" variant="outlined" color="secondary">
              <h1>EDIT API</h1>
            </Button>
          </Link>
          </div>
        </div>
        <div className='ApiDetails-description'>
          DESCRIPTION
          adsfgñkljnasdgñljnsdgñjansdglkjndsgljknadfsgñkjnasdñgojnsd
        </div>
        <div className='ApiDetails-latestData'>
          LATEST DATA
          <ApiDataTable api={apiName}/>
        </div>
        <div className='ApiDetails-apiMethods'>
          YOUR API methods
          GET
          GET/field/id
          POST
          PUT/id
          DELETE/id
        </div>
        <div className='ApiDetails-apiCredentials'>
          API KEY : SDGOJHASDGOÑASDG
          API SECRET KEY : ASDFJADSGOISDGOJNAA
        </div>

      </div>
    </>
  );
};

export default ApiDetails;





//  apiName NOT DEFINED