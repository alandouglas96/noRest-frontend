import React, { useState, useReducer } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import uuid from 'uuid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

import FieldRow from '../../presentional/CreateApiFormRow/CreateApiFormRow'
import IsPublicSelect from '../../presentional/IsPublicSelect'

import {handleApiSubmit} from '../../../services/createApiformServices'

import BreadCrumb from '../../presentional/breadcrumps/apiDetailsBC';


import './style.css';

function CreateApiForm ({submitApi, history})  {
  const [numberOfFields, setNumerOfFields] = useState(1);

  const FIELD_ROWS_INITIAL_STATE = {
    rows: {
      [numberOfFields + '-' + uuid()]: {
        valueType: 'String',
        error: '',
        touch: false,
        value: '',
        allowNull: true,
        description: ''
      }
    }}

  const [fieldRows, dispatch] = useReducer(fieldRowsReducer, FIELD_ROWS_INITIAL_STATE);
  function fieldRowsReducer (fieldRows, action) {
    switch(action.type) {
      case 'SET_NEW_ROW':
      return  {
        rows:
        {
          ...fieldRows.rows, [(numberOfFields) + '-' + uuid()]: {
          valueType: 'String',
          error: '',
          touch: false,
          value: '',
          allowNull: true,
          description: ''
          }
        }
      }
      case 'SET_SELECT_ROW':
      return  {
        rows:
        {
          ...fieldRows.rows,
          [action.payload.rowId]: {
            ...fieldRows.rows[action.payload.rowId],
            [action.payload.inputName]: action.payload.value,
            touched: true,
          }
        }
      }
      case 'SET_ALLOW_NULL_ROW':
      return  {
        rows:
        {
          ...fieldRows.rows,
          [action.payload.rowId]: {
            ...fieldRows.rows[action.payload.rowId],
            allowNull: action.payload.value,
            touched: true,
          }
        }
      }
      case 'SET_INPUT_ROW':
        return {
          rows:
          {
            ...fieldRows.rows,
            [action.payload.rowId]: {
              ...fieldRows.rows[action.payload.rowId],
              [action.payload.inputName]: action.payload.value,
              touched: true,
              error: action.payload.error
            }
          }
        }
      case 'DELETE_ROW':
        const updatedRows = _.reduce(fieldRows.rows,(acc,element, key) => {
          if (key !== action.payload) {
            acc[key]=element
          }
          return acc
        }, {});

        return {
          rows:
          {
            ...updatedRows,
          }
        }
      default:
        return fieldRows
    }
  }

  const [isPublicState, setIsPublicState] = useState(true);

  const [apiName, setApiName] = useState({
    value:'',
    error:'',
  })
  const [description, setDescription] = useState({
    value:'',
    error:'',
  })


    const handleIsPublicChange =  (event) => {
      setIsPublicState(event.target.value);
    };

    function handleApiNameChange (event) {
      setApiName({
        ...apiName,
        value: event.target.value,
      })
    }

    function handleDescriptionChange (event) {
      setDescription({
        ...description,
        value: event.target.value,
      })
    }

    function handleApiNameValidation (event) {
      let error='';
      if (event.target.value==='') {
        error = ('Api Name required')
      }
      setApiName({
        value: event.target.value,
        error
      })
    }

    function handleSelectChange (event, inputName, rowId, type) {
      dispatch({type: 'SET_SELECT_ROW', payload: {value: event.target.value, inputName, rowId}})
    }

    function handleChange (event, inputName, rowId, type) {
      let error='';
      if ((type==='input') && (event.target.value==='')) {
        error = ('Field name required')
      }
      dispatch({type: 'SET_INPUT_ROW', payload: {value: event.target.value, inputName, rowId, error}})
    }

  function addFormRow () {
    dispatch({type: 'SET_NEW_ROW'})
    setNumerOfFields(numberOfFields => numberOfFields + 1)
    }

  function deleteRow (e, rowId) {
    dispatch({type: 'DELETE_ROW', payload: rowId})
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
    <form onSubmit={(e) => handleApiSubmit(e, fieldRows, apiName, submitApi, isPublicState, history, description )}>
      <div className="title1">Create your own RESTful API</div>
      <div className="CreateApiForm-title">API Name</div>
      <div className="flex align-center">
        <TextField variant="outlined" size="small"
          onChange={handleApiNameChange}
          onBlur={handleApiNameValidation}
          name="Api Name"
          label="Api Name"
          value={apiName.value}
          required
        />
        <div className="flex align-center">
          <div className="title2" style={{marginRight:'20px', marginLeft:'40px'}}>Your endpoint: </div>
          <div>https://no-rest-api.herokuapp.com/api/{apiName.value}</div>
        </div>
      </div>
      <div className="errorText">{apiName.error}</div>

      <div className="flex align-center">
        <TextField variant="outlined" size="small"
          onChange={handleDescriptionChange}
          name="Description"
          label="Description"
          value={description.value}
          required
          multiline={true}
          style={{width:'700px'}}
        />
       
      </div>

        <div className="CreateApiForm-title" style={{marginTop: '10px'}}>Privacy</div>
        <div className="flex">
          <IsPublicSelect value={isPublicState} handleChange={handleIsPublicChange}></IsPublicSelect>
            <div className="flex-column">
              <div className="flex align-center">
                <div className="title2" style={{marginRight:'20px', marginLeft:'40px'}}>Public:</div>
                <div>Everyone can do a get request to your Api</div>
              </div>
              <div className="flex align-center">
                <div className="title2" style={{marginRight:'20px', marginLeft:'40px'}}>Private:</div>
                <div>Only You or who you decide can access de API</div>
              </div>
            </div>
        </div>
        <div className="CreateApiForm-title">Describe your collection</div>
      <div className="flex-column">

        <div className="flex-column">
        {_.map(fieldRows.rows,(row, rowKey) => {
          return (
          <FieldRow
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            deleteRow={deleteRow}
            fieldTypeName={`fielTypeName${rowKey}`}
            fieldName={`fieldName${rowKey}`}
            fieldAllowName={`fielTypeName${rowKey}`}
            rowId= {rowKey}
            key= {rowKey}
            fieldRows = {fieldRows}
            error= {row.error}
            touched = {row.touched}
          />
        )})}
        </div>
        <div className="flex">
          <div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => addFormRow(fieldRows)}>Add Row
          </Button>
          </div>
          </div>
        <div className="flex justify-center" style={{paddingTop: '50px'}}>
          <Button variant="contained" color="primary" type="submit" style={{maxWidth: '300px', maxHeight: '40px', minWidth: '300px', minHeight: '40px'}}>Submit</Button>
        </div>
      </div>
      </form>
      </div>
    </div>
  )
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, actions)(withRouter(CreateApiForm));
