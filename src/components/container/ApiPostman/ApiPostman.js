import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/createApiActions';
// import { fetchUserApisAction } from "../../../actions/";

import { getApiData } from '../../../services'
import BreadCrumb from '../../presentional/breadcrumps/apiDetailsBC';


import './style.css';
//const apiName = props.match.params.apiName;
function ApiPostman ({
  userApis,
  history,
  match
}){
  const apiName = match.params.apiName;
  
  
  const userApi = _.filter(userApis, (api) => {
    return (api.api_name === apiName)
  })
  
  console.log('Api name', apiName );
  console.log('User API', userApi)
  console.log('Data in user Api', userApis )
  useEffect(()=>{
      getApiData(apiName);
  },[apiName]);
  
  return (

    <div className="box">
      <div className="bread-crumb">
        <BreadCrumb/>
        <div className="flex">
          <Link to="/">
            <Button color="secondary" variant="contained" size="small">Back</Button>
          </Link>
        </div>
      </div>
      <div className="box2">


      <div className="title2">Postman</div>
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  userApis: state.userApis.userApis
});

// const mapDispatchToProps = dispatch => ({
//   fetchUserApis: () => dispatch(fetchUserApisAction())
// });

export default connect(mapStateToProps, actions)(withRouter(ApiPostman));
