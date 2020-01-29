import React from 'react';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import './style.css';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputFocused: {
    backgroundColor: "#00FF00",
    borderColor: '#FFFFFF',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    maxHeight: '20px',
    width: '40%',
  }

}));

export default ({label, handleChange, rowId, handelOnChange, error, touched}
) => {
  const classes = useStyles();
  console.log('Error--->', error)
  console.log('Touched--->', touched)
  return (
  <div className="minHeight">
    <FormControl variant="outlined" className={classes.formControl} style={{minWidth: 130}}>
      <TextField size="small" autoComplete='off' id="outlined-basic"  variant="outlined"
      label={label}
      onChange={handelOnChange}
      onBlur={(e) => handleChange(e, 'value', rowId, 'input')}
       />
       <FormHelperText error>{error}</FormHelperText>
    </FormControl>
    </div>
  )
}
