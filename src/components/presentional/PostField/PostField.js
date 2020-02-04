import React, {useState} from "react";
import { TextField } from "@material-ui/core";
import "./style.css";
import _ from 'lodash'

const PostField = ({ fieldsState, handleBlur, fieldKey }) => {
  const [textFieldState, setTextFieldState] = useState('');

  function handleOnChange (e){
    console.log(textFieldState)
    setTextFieldState(e.target.value)
  }
  return  (
    <div className="flex align-center" style={{minHeight: '50px'}} key={fieldKey}> 
      <div className="title2" style={{marginRight: '10px'}}>
        {fieldsState[fieldKey].name} 
      </div>
      <div>
        <TextField 
          variant="outlined" 
          onChange={handleOnChange}
          key={fieldKey} 
          value={textFieldState}
          onBlur={(e) => handleBlur(e, fieldKey)}  
          label={fieldsState[fieldKey].type}
          size="small"
        />
      </div>
    </div>
  )
};

export default PostField;
