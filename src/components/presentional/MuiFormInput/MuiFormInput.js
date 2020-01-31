import React from 'react';
import { TextField } from '@material-ui/core';

import './style.css';

export default ({label, handleChange, rowId, handelOnChange, error}
) => {
  return (
    <div>
      <TextField size="small" autoComplete='off' id="outlined-basic"  variant="outlined"
      label={label}
      onChange={handelOnChange}
      onBlur={(e) => handleChange(e, 'value', rowId, 'input')}
      key={`${rowId}`}
      required
       />
       <div className="errorText">{error}</div>
    </div>
  )
}
