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
       <div key={fieldKey}> 
        {fieldsState[fieldKey].name} : 
        {
          <TextField 
          variant="outlined" 
          onChange={handleOnChange}
          key={fieldKey} 
          value={textFieldState}
          onBlur={(e) => handleBlur(e, fieldKey)}  
          label={fieldsState[fieldKey].type}
          />
          }
        </div>
     
      )
   
    
};

export default PostField;
