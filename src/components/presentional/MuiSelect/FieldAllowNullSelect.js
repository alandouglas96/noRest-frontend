import React from 'react';
import { 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import './style.css';


export default ({ value, handleChange, rowId
}) => {

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

  return (
    <div>
      <FormControl size="small" variant="outlined" style={{minWidth: 130}}>
        <InputLabel ref={inputLabel} id="simple-select-outlined-label">
          Allow Null
        </InputLabel>
        <Select onChange={(e) => handleChange(e, 'allowNull', rowId)} className="length"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          labelWidth={labelWidth}
        >
          <MenuItem id={1} value={true}>Yes</MenuItem>
          <MenuItem id={2} value={false}>No</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}