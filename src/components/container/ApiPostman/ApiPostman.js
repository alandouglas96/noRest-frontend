import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/createApiActions';
import PostmanTable from '../../presentional/PostmanTable'
import PostDataRow from '../../presentional/postDataRow'
import { getApiData } from '../../../services'
import BackButton from '../../presentional/BackButton'
import SearchBar from '../../presentional/SearchBar'

import './style.css';

function ApiPostman ({
  userApis,
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

  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [apiData, setApiData] = useState([])
  const [togglePost, setTogglePost] = useState(false)
  
  useEffect( ()=> {
    const stateSetter = async () => {
      const data = await getApiData(apiName)
      setApiData(data);
      setRows(data) 
    }

    stateSetter();
  },[apiName]);

  function handleTogglePost (event) {
    setTogglePost(!togglePost)
  } 

  function handleSearch (e)  {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    const filteredRows = apiData.filter((row) => {
      for (let key in row) {
        if (row[key].toString().toLowerCase().includes(searchValue) && row[key] !== '_id' && row[key] !== '__v') return true;
      }
      });

    if (filteredRows.length === 0) {
    const noSearchResult = {};
    const rowsKeys = Object.keys(rows[0]);
      rowsKeys.forEach(key => {
        if (key !== '_id' && key !== '__v')
        noSearchResult[key] = ""
      });
      setRows([noSearchResult])
    } else setRows(filteredRows);
  }

  function refreshRows(newRows) {
    if (Array.isArray(newRows)) {
      setRows([...rows, ...newRows])
      setApiData([...rows, ...newRows])
      }
    else {
      setRows([...rows, newRows])
      setApiData([...rows, newRows])
      }
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
            <PostDataRow refreshRows={refreshRows} fields={userApi} apiInfo={apiInfo} /> 
            </>
            : null}
        </div>
        </div>
          {rows && rows.length && userApi[0]
            ? 
            <div className="margin-top">
            <div className="flex align-center justify-center">
              <SearchBar handleSearch={handleSearch}
                searchValue={searchValue}
         />
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
