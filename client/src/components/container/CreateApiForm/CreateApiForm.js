import React, { useState, useReducer } from 'react';
import { TextField, Button } from '@material-ui/core';
import uuid from 'uuid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

import FieldRow from '../../presentional/CreateApiFormRow/CreateApiFormRow'
import Switch from '../../presentional/MuiSwitch/MuiSwitch'

import {handleApiSubmit} from '../../../services/createApiformServices'
import FormHelperText from '@material-ui/core/FormHelperText';

import './style.css';

function CreateApiForm ({submitApi})  {
  const [numberOfFields, setNumerOfFields] = useState(1);

  const FIELD_ROWS_INITIAL_STATE = {
    rows: {
      [numberOfFields + '-' + uuid()]: {
        valueType: 'String',
        error: '',
        touch: false,
        value: ''
      }
    }}

  const [fieldRows, dispatch] = useReducer(fieldRowsReducer, FIELD_ROWS_INITIAL_STATE);

  function fieldRowsReducer (fieldRows, action) {
    console.log('REDUCER', action.payload)
    switch(action.type) {
      case 'SET_NEW_ROW': 
      return  {
        rows:
        {
          ...fieldRows.rows, [(numberOfFields+1) + '-' + uuid()]: {
          valueType: 'String',
          error: '',
          touch: false,
          value: ''
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
      default: 
        return fieldRows
    }
  }

  const [switchState, setSwitchState] = useState({
    checked: false,
  });
  
  const [apiName, setApiName] = useState({
    value:'',
    error:'',
  })


    const handleSwitchChange = () => event => {
      setSwitchState({ ...switchState, checked: event.target.checked });
      console.log(switchState);
    };

    function handleApiNameChange (event) {
      console.log(apiName)
      setApiName({
        ...apiName,
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

  function addFormRow (fieldRows) {

    dispatch({type: 'SET_NEW_ROW'})
    setNumerOfFields(numberOfFields => numberOfFields + 1)
    }

  return (
    <div className="box">
      <h1>Api Name</h1>
      
      <div className="flex justify-center">
      <div className="flex-column">
      <TextField variant="outlined" size="small"
        onChange={handleApiNameChange}
        onBlur={handleApiNameValidation}
        name="Api Name"
        label="Api Name"
        value={apiName.value}
      />
      <FormHelperText error style={{marginLeft: '15px'}}>{apiName.error}</FormHelperText>
      </div>
      <Switch state={switchState} handleChange={handleSwitchChange}></Switch>
      </div>
      <h1>Create Api Form</h1>

      <form onSubmit={(e) => handleApiSubmit(e, fieldRows, apiName, submitApi, switchState )}>
        {_.map(fieldRows.rows,(row, rowKey) => {
          return (
          <FieldRow 
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            fieldTypeName={`fielTypeName${rowKey}`}
            fieldName={`fieldName${rowKey}`}
            rowId= {rowKey}
            key= {rowKey}
            fieldRows = {fieldRows}
            error= {row.error}
            touched = {row.touched}
          />
        )})}
      <div className="flex" style={{paddingTop: '50px'}}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => addFormRow(fieldRows)}>Add Row
        </Button>
        <div style={{width:'10px'}}></div>
          <Button variant="outlined" color="primary" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, actions)(withRouter(CreateApiForm));
