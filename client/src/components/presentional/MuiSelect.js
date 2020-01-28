import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default ({ value, handleChange, rowId
}) => {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

  return (
    <div>
      <FormControl size="small" variant="outlined" className={classes.formControl} style={{minWidth: 130}}>
        <InputLabel ref={inputLabel} id="simple-select-outlined-label">
          Select Field Type
        </InputLabel>
        <Select onChange={(e) => handleChange(e, 'valueType', rowId)} className="length"
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          labelWidth={labelWidth}
        >
          <MenuItem id={1} value={"String"}>String</MenuItem>
          <MenuItem id={2}value={"Number"}>Number</MenuItem>
          <MenuItem id={3}value={"Date"}>Date</MenuItem>
          <MenuItem id={4} value={"Boolean"}>Boolean</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}