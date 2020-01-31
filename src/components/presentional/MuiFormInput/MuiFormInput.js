import React from 'react';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

import './style.css';

export default ({label, handleChange, rowId, handelOnChange, error}
) => {
  return (
  <div className="minHeight">
    <FormControl key={`${rowId}1`}variant="outlined" style={{minWidth: 130}}>
      <TextField size="small" autoComplete='off' id="outlined-basic"  variant="outlined"
      label={label}
      onChange={handelOnChange}
      onBlur={(e) => handleChange(e, 'value', rowId, 'input')}
      key={`${rowId}`}
      required
      //id={`${rowId}9y`}
       />
       <div className="errorText">{error}</div>
    </FormControl>
    </div>
  )
}
