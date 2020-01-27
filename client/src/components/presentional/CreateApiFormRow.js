import React from 'react';
import MuiInput from '../presentional/MuiFormInput';
import MuiSelect from '../presentional/MuiSelect';

export default ({
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
