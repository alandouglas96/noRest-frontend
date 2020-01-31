import React, {useState} from 'react';
import MuiInput from '../MuiFormInput/MuiFormInput';
import FieldTypeSelect from '../MuiSelect/FielTypeSelect';
import FieldAllowNullSelect from '../MuiSelect/FieldAllowNullSelect'
import { Button } from '@material-ui/core';

export default ({
    fieldName,
    fieldTypeName,
    handleChange,
    handleSelectChange,
    deleteRow,
    rowId,
    fieldRows,
    error,
    touched
  }) => {
    
    const [state, setState] = useState(fieldRows.rows[rowId].value)
    function handleOnChange (e) {
      setState(e.target.value)
    }
    
   return (
    <div className="flex">
      <MuiInput
        handleChange={handleChange}
        name={fieldName}
        label="Field Name"
        rowId={rowId}
        value={state}
        handelOnChange={handleOnChange}
        error={error}
        touched={touched}
        key={`${rowId}`}

      />
      <div style={{width:'10px'}}></div>
      <FieldTypeSelect
        value = {fieldRows.rows[rowId].valueType}
        handleChange={handleSelectChange}
        name={fieldTypeName}
        component={FieldTypeSelect}
        rowId={rowId}
        key={`${rowId}2`}
      />
      <div style={{width:'10px'}}></div>
      <FieldAllowNullSelect
        value = {fieldRows.rows[rowId].allowNull}
        handleChange={handleSelectChange}
        name={fieldTypeName}
        component={FieldTypeSelect}
        rowId={rowId}
        key={`${rowId}3`}
      />
      <div style={{width:'10px'}}></div>
        <Button 
          onClick={(e) => deleteRow(e, rowId)}
          variant="contained"
          color="secondary"
          style={{maxHeight: '40px', minHeight: '40px'}}
          size="small"
          key={`${rowId}4`}
          >
            Remove
        </Button>
    </div>
   )
  }
