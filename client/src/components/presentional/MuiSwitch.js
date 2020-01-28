import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels({handleChange, state}) {
 

 

  return (
    <FormGroup row>
      
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label="Private"
      />
    
      
      
    </FormGroup>
  );
}