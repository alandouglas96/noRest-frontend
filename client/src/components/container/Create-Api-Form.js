import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import MuiInput from '../presentional/MuiInput';
import MuiSelect from '../presentional/MuiSelect';
import uuid from 'uuid';
import _ from 'lodash';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const FieldRow = ({
  fieldName, 
  fieldTypeName, 
  handleChange, 
  rowId, 
  fieldRows
}) => {
 return (
  <div className="flex">
    <MuiInput
      handleChange={handleChange}
      name={fieldName} 
      label="Field Name"  
      rowId={rowId}
      value={fieldRows.rows[rowId].value}
    />
    <MuiSelect
      value = {fieldRows.rows[rowId].valueType}
      handleChange={handleChange} 
      name={fieldTypeName} 
      component={MuiSelect}
      rowId={rowId}
    />
  </div>
 )
}

function validateApiName(value) {
  let error; //fetch to database and find exisiting api name
  console.log('VALUE',value);
  
  if (value === '') {
    error = 'my error';
  }
  return error;
}

export default () => {
  const [formSchema, setFormSchema] = useState({});
  const [numberOfFields, setNumerOfFields] = useState(1)
  const [apiName, setApiName] = useState('')
  const [fieldRows, setFieldRows] = useState({rows: {
    [numberOfFields + '-' + uuid()]: {
      valueType: 'String',
      error: 'no',
      touch: false,
      value: ''
    }}})
  const classes = useStyles();
  useEffect(()=>{
      
      console.log('STATE: fieldRows', fieldRows);
    },[fieldRows]);

    function handleSubmit(e) {
      e.preventDefault();
    
      const fieldsObjectArray=[];
      _.each(fieldRows.rows, row => {
        fieldsObjectArray
        .push({
          field_name: row.value,
          field_type: row.valueType,
          allow_null: false,
          default_value: '',
        })
      });

      console.log('fieldsObject',fieldsObjectArray );
      
      const sendApiObject = {
        api: {
          name: apiName,
          description: 'description',
          fields: fieldsObjectArray
        },
        user: {
          id: 1111,
          name: 'Jose Fran'
        },
      }
      console.log('Submitted----> ApiName',apiName, 'FORM STATE:', fieldRows);
      console.log('sendApiObject', sendApiObject)
      const url = 'http://localhost:3009/logistics/api';

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(sendApiObject)
      };
   try {
     fetch(url, options)
       .then(response => {
         console.log('Post Request Sended')
         console.log(response.status);
       })
       .catch(e => {
         console.log('Error on Post Request');
       });
     }
    catch (e) {
     console.log('Error on try catch')
   }
  }

    function handleApiNameChange (e) {
      setApiName(e.target.value)

    }
    function handleChange (e, rowId, inputName) {
      setFieldRows({ 
        rows: 
        {
          ...fieldRows.rows, 
          [rowId]: {
            ...fieldRows.rows[rowId],
            [inputName]: e.target.value
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
          error: 'no',
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
      <MuiInput handleChange={handleApiNameChange}
                name="Api Name" 
                label="Api Name" 
                value={apiName}
                />
        <h1>Create Api Form</h1>
          
            <form onSubmit={handleSubmit}>
             
              {_.map(fieldRows.rows,(_, rowKey) => {
                return (
                <FieldRow name={"TEST"}
                  handleChange={handleChange}
                  fieldTypeName={`fielTypeName${rowKey}`} 
                  fieldName={`fieldName${rowKey}`} 
                  rowId= {rowKey}
                  key= {rowKey}
                  fieldRows = {fieldRows}
                />
              )})}
              <Button onClick={() => addFormRow(fieldRows)}>Add Row</Button>
              <Button type="submit">Submit</Button>
            </form>
          
 
      </div>
    </div>
  )
}