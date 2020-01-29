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
            Endpoint: <span className='ApiDetails-head-endpoint-span'>https://no-rest.heroku.com/{apiName}</span>
          </div>
          <div className='ApiDetails-head-item'>
            <Link to={`/apiDetails/docs/${apiName}`}>
              <Button size="small" variant="contained" style={{color:'white', backgroundColor:'#E85F48', width:'150px', height:'40px'}}>
              <span className='ApiDetails-head-button'>DOCS</span>
              </Button>
            </Link>
          </div>
          <div className='ApiDetails-head-item'>
            <Link to={`/apiDetails/edit/${apiName}`}>
              <Button size="small" variant="contained" style={{color:'white', backgroundColor:'#175999', width:'150px', height:'40px'}}>
                <span className='ApiDetails-head-button'>EDIT API</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className='ApiDetails-description'>
          DESCRIPTION
          adsfgñkljnasdgñljnsdgñjansdglkjndsgljknadfsgñkjnasdñgojnsd
        </div>
        <div className='ApiDetails-latestData'>
          <div className='ApiDetails-title'>
            Latest Data
          </div>
          <ApiDataTable api={apiName}/>
        </div>
        <div className='ApiDetails-apiMethods'>
          <div className='ApiDetails-title'>
            Your API Methods
          </div>
          <div className='ApiDetails-apiMethods-method'>
            <div className='ApiDetails-apiMethods-method-name'>GET</div><span className='ApiDetails-apiMethods-method-span'>Returns a JSON Object with ALL the data in you database</span>
          </div>
          <div className='ApiDetails-apiMethods-method'>
            <div className='ApiDetails-apiMethods-method-name'>GET/field/id</div> <span className='ApiDetails-apiMethods-method-span'>Returns a JSON Object with all the rows whose #field column value is equal to #name</span>
          </div>
          <div className='ApiDetails-apiMethods-method'>
            <div className='ApiDetails-apiMethods-method-name'>POST</div> <span className='ApiDetails-apiMethods-method-span'>Send in the body a JSON Object which will be input in the DB</span>
          </div>
          <div className='ApiDetails-apiMethods-method'>
            <div className='ApiDetails-apiMethods-method-name'>PUT/id</div><span className='ApiDetails-apiMethods-method-span'>Send in the body a JSON object with the ID to update the record</span>
          </div>
          <div className='ApiDetails-apiMethods-method'>
            <div className='ApiDetails-apiMethods-method-name'>DELETE/id</div><span className='ApiDetails-apiMethods-method-span'>Deletes the record with such ID and returns the deleted record</span>
          </div>
        </div>
        <div className='ApiDetails-apiCredentials'>
          <div className='ApiDetails-title'>
            Your API Credentials
          </div>
          <div className='ApiDetails-apiCredentials-item'>
          API KEY : SDGOJHASDGOÑASDG
          </div>
          <div className='ApiDetails-apiCredentials-item'>
          API SECRET KEY : ASDFJADSGOISDGOJNAA
          </div>
        </div>

      </div>
    </>
  );
};

export default ApiDetails;





//  apiName NOT DEFINED