import React from 'react';
import { TextField } from '@material-ui/core';

import './style.css';

export default ({label, handleChange, rowId, value, type, name}
) => {
  return (
    <TextField autoComplete='off' id="outlined-basic"  size="small" variant="outlined"
    value={value}
    type={type}
    label={label} onChange={(e) => handleChange(e, name, rowId)}
      />
  )
}
