import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/createApiActions';
import PostmanTable from '../../presentional/PostmanTable'
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
  
  const [rows, setRows] = useState([])
  console.log('user api--------->', userApi[0]);

  useEffect( ()=> {

    const stateSetter = async () => {
      console.log('enters useEffect', apiName)
      const data = await getApiData(apiName)
        setRows(() => data) 
    }
    stateSetter();
  },[apiName]);
  
  console.log('Data in use Effect----------------->', rows)
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
        {rows && rows.length ? <PostmanTable rows={rows} columns={userApi[0].api_fields}/> : null }
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
