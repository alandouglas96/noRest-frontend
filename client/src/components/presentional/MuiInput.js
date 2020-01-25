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
}));

export default ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const classes = useStyles();
  return (
  <div className="minHeight">
    <FormControl {...field} {...props} variant="outlined" className={classes.formControl} style={{minWidth: 130}}>
      <TextField  {...field} {...props} id="outlined-basic"  variant="outlined" />
        { 
        touched[field.name] &&
        errors[field.name] && 
        <FormHelperText error={true}>{errors[field.name]}</FormHelperText> 
        }
      </FormControl>
    </div>
  )
}
