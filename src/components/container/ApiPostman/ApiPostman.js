import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/createApiActions';
import PostmanTable from '../../presentional/PostmanTable'
import PostDataRow from '../../presentional/postDataRow'
import { getApiData } from '../../../services'
import BackButton from '../../presentional/BackButton'


import './style.css';

function ApiPostman ({
  userApis,
  history,
  match
}){

  const apiName = match.params.apiName;
  
  
  const userApi = _.filter(userApis, (api) => {
    return (api.api_name === apiName)
  })
  let apiInfo= {};
   _.forEach(userApis, (api) => {
    if (api.api_name === apiName) {
      apiInfo ={apiName: api.api_name, apiKey:api.api_key,apiSecretKey: api.api_secret_key}
    }
  })
  console.log('Api KEYS', apiInfo)  
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [initialRows, setInitialRows] = useState([])
  const [togglePost, setTogglePost] = useState(false)
  
  useEffect( ()=> {

    const stateSetter = async () => {
      const data = await getApiData(apiName)
      setInitialRows(data);
      setRows(() => data) 
    }
    
    stateSetter();
  },[apiName]);

  function handleTogglePost (event) {
    setTogglePost(!togglePost)
  } 

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
        <div className="bc">Dashboard / API Details / API Data</div>
        <div className="flex">
        <BackButton/>
        </div>
      </div>
      <div className="box2">
        <div className="bigTitle">Api Data</div>
        <div className="linkStyle" style={{cursor:'pointer', fontSize:'1.3em'}} onClick={handleTogglePost}>Post Data {togglePost ? <span>-</span> : <span>+</span>}</div>
        <div className=" flex-column justify-center">
        
        <div className="flex-column margin-top  margin-bottom">
          {userApi[0] && togglePost
            ? 
            <>
            <PostDataRow fields={userApi} apiInfo={apiInfo} /> 
            <div className="flex-column align-center">
        </div>
            </>
            : null}
        </div>
        <div>

         
        </div>
        
          </div>
        {rows && rows.length && userApi[0]
          ? 
            <div className="margin-top">
            <div className="flex align-center justify-right">
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
              Seach
            </Button>
              <div style={{width:'10px'}}></div>
            <Button 
              variant="contained"
              color="secondary"
              size="small"
              style={{maxWidth: '50px'}}
              onClick={() => handleReset(initialRows)}
            >
              Reset
            </Button>
          </div>
          <div className="margin-top margin-bottom">
        
       
          </div>
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
