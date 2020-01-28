import React, {useState} from 'react';
import MuiInput from '../MuiFormInput/MuiFormInput';
import MuiSelect from '../MuiSelect/MuiSelect';

export default ({
    fieldName,
    fieldTypeName,
    handleChange,
    handleSelectChange,
    rowId,
    fieldRows,
    error,
    touched
  }) => {
    const [state, setState] = useState(fieldRows.rows[rowId].value)
    function handleOnChange (e) {
      console.log('state',state)
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
      />
      <MuiSelect
        value = {fieldRows.rows[rowId].valueType}
        handleChange={handleSelectChange}
        name={fieldTypeName}
        component={MuiSelect}
        rowId={rowId}
      />
    </div>
   )
  }
