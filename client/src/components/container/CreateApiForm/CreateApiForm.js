import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
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
  const [switchState, setSwitchState] = useState({
    checked: false,
  });
  const [numberOfFields, setNumerOfFields] = useState(1)
  const [apiName, setApiName] = useState({
    value:'',
    error:'',
  })
  const [fieldRows, setFieldRows] = useState({
    rows: {
      [numberOfFields + '-' + uuid()]: {
        valueType: 'String',
        error: '',
        touch: false,
        value: ''
      }
    }})

    const handleSwitchChange = name => event => {
      setSwitchState({ ...switchState, checked: event.target.checked });
      console.log(switchState);
    };

    function handleApiNameChange (e) {
      console.log(apiName)
      setApiName({
        ...apiName,
        value: e.target.value,
      })
    }

    function handleApiNameBlur (e) {
      let error='';
      if (e.target.value==='') {
        error = ('Api Name required')
      }
      setApiName({
        value: e.target.value,
        error
      })
    }

    function handleChange (e, inputName, rowId) {
      let error='';
      if (e.target.value==='') {
        error = ('Field name required')
      }

      setFieldRows({
        rows:
        {
          ...fieldRows.rows,
          [rowId]: {
            ...fieldRows.rows[rowId],
            [inputName]: e.target.value,
            touched: true,
            error
          }
        }
      });
    }

  function addFormRow (fieldRows) {

    setFieldRows(
      {
        rows:
        {
          ...fieldRows.rows, [(numberOfFields+1) + '-' + uuid()]: {
          valueType: 'String',
          error: '',
          touch: false,
          value: ''
          }
        }
      });
      setNumerOfFields(numberOfFields => numberOfFields + 1)
    }

  return (
    <div>
      <div>
        <h1>Api Name</h1>
        <TextField variant="outlined" size="small"
          onChange={handleApiNameChange}
          onBlur={handleApiNameBlur}
          name="Api Name"
          label="Api Name"
          value={apiName.value}
        />
        <FormHelperText error style={{marginLeft: '15px'}}>{apiName.error}</FormHelperText>
        <Switch state={switchState} handleChange={handleSwitchChange}></Switch>
        <h1>Create Api Form</h1>

        <form onSubmit={(e) => handleApiSubmit(e, fieldRows, apiName, submitApi, switchState )}>
          {_.map(fieldRows.rows,(row, rowKey) => {
            return (
            <FieldRow name={"TEST"}
              handleChange={handleChange}
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
    </div>
  )
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, actions)(withRouter(CreateApiForm));
