import React, {useState} from 'react';
import FieldTypeSelect from '../MuiSelect/FielTypeSelect';
import FieldAllowNullSelect from '../MuiSelect/FieldAllowNullSelect'
import { Button, TextField} from '@material-ui/core';

export default ({
    handleChange,
    deleteRow,
    rowId,
    fieldRows,
    error,
    touched
  }) => {
<<<<<<< HEAD
    
    const [inputFieldValue, setinputFieldValue] = useState(fieldRows.rows[rowId].value)
=======

    const [state, setState] = useState(fieldRows.rows[rowId].value)
>>>>>>> minor changes in ApiEdit
    function handleOnChange (e) {
      setinputFieldValue(e.target.value)
    }

   return (
    <div className="flex">
      <div>
        <TextField
          autoComplete='off' 
          error={error ? true : false}
          id="outlined-basic"  
          label="Field Name"
          onBlur={(e) => handleChange(e,'value', rowId)}
          onChange={handleOnChange}
          required
          size="small" 
          value={inputFieldValue}
          variant="outlined"
        />
        <div className="errorText">{error}</div>
      </div>
      
      <div style={{width:'10px'}}></div>
      <FieldTypeSelect
        component={FieldTypeSelect}
        handleChange={handleChange}
        rowId={rowId}
        value = {fieldRows.rows[rowId].valueType}
      />
      <div style={{width:'10px'}}></div>
      <FieldAllowNullSelect
        component={FieldTypeSelect}
        handleChange={handleChange}
        rowId={rowId}
        value = {fieldRows.rows[rowId].allowNull}
      />
      <div style={{width:'10px'}}></div>
<<<<<<< HEAD
        <Button 
=======
        <Button
          onClick={(e) => deleteRow(e, rowId)}
          variant="contained"
>>>>>>> minor changes in ApiEdit
          color="secondary"
          onClick={(e) => deleteRow(e, rowId)}
          size="small"
          style={{maxHeight: '40px', minHeight: '40px'}}
          variant="contained"
          >
            Remove
        </Button>
    </div>
   )
  }
