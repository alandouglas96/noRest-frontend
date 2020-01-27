import React from 'react';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';


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

export default ({label, handleChange, rowId, value, type, name}
) => {
  const classes = useStyles();
  return (
  <div className="minHeight">
    <FormControl variant="outlined" className={classes.formControl} style={{minWidth: 130}}>
      <TextField autoComplete='off' id="outlined-basic"  variant="outlined"
      value={value}
      type={type}
      label={label} onChange={(e) => handleChange(e, name, rowId)}
       />
    </FormControl>
    </div>
  )
}
