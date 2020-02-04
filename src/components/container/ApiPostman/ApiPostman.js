import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
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
  
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [initialRows, setInitialRows] = useState([])
  
  useEffect( ()=> {

    const stateSetter = async () => {
      const data = await getApiData(apiName)
      setInitialRows(data);
      setRows(() => data) 
    }
    
    stateSetter();
  },[apiName]);

  function handleSearch (search) {
    setRows((rows) => {
      
      const newRows = rows.filter((row) => {
        let flag = false;
        _.map(row, (rowValues, rowKey) => {
           if (rowValues.toString().includes(search) && rowKey!=='_id' && rowKey!=='__v') flag=true
        })
        
        return flag;
      })
      return newRows;
    })
  }
  function handleOnChange (e)  {
    setSearchValue(e.target.value);
  }

  function handleReset (initialRows) {
    setRows(initialRows)
  }
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
        <div className="bigTitle">Postman</div>
        <div className="margin-top flex-column align-center justify-center">
        <div className="flex align-center">
        <TextField
          autoComplete='off'
          id="inputSearch"
          label="Search"
          onChange={handleOnChange}
          size="small"
          value={searchValue}
          variant="outlined"
        />
        <div style={{width:'10px'}}></div>
        <Button 
          onClick={() => handleSearch(searchValue)}
          variant="contained"
          color="primary"
          size="small"
          style={{maxWidth: '50px', maxHeight: '30px'}}
          >
          
          Seach</Button>
        </div>
        <div className="margin-top margin-bottom">
        
        <Button 
        variant="contained"
          color="secondary"
          size="small"
          style={{maxWidth: '50px'}}
          onClick={() => handleReset(initialRows)}>Reset</Button>
          </div>
          </div>
        {rows && rows.length 
          ? 
            <div className="margin-top">
            <PostmanTable
              rows={rows} 
              columns={userApi[0].api_fields}
            />
            </div>
          : null }
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  userApis: state.userApis.userApis
});

export default connect(mapStateToProps, actions)(withRouter(ApiPostman));
