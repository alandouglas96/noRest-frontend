import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './style.css';
const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
  },
}));
export default ({ value, handleChange, rowId, label
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
  return (
    <div>
      <FormControl size="small" variant="outlined" className={classes.formControl} style={{minWidth: 197}}>
        <InputLabel ref={inputLabel} id="simple-select-outlined-label">
         
        </InputLabel>
        <Select onChange={handleChange} className="length"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          labelWidth={labelWidth}
          name="public"
        >
          <MenuItem id={1} value='Public'>Public</MenuItem>
          <MenuItem id={2} value='Private'>Private</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}



