import React from 'react';
import { TextField } from '@material-ui/core';

import './style.css';

export default ({label, handleChange, rowId, handelOnChange, error}
) => {
  return (
    <div>
     
   
      onChange={handelOnChange}
      onBlur={(e) => handleChange(e,'value', rowId)}
      key={`${rowId}`}
      required
       />
       <div className="errorText">{error}</div>
    </div>
  )
}
