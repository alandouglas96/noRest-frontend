import React, {useState, useEffect} from "react";
import { TextField } from "@material-ui/core";
import "./style.css";

const PostField = ({ fieldState, handleBlur, fieldKey }) => {
  const [textFieldState, setTextFieldState] = useState(fieldState.value);

  useEffect(() => {
    setTextFieldState(fieldState.value);
  }, [fieldState.value]);

  function handleOnChange (e){
    setTextFieldState(e.target.value)
  }

  return  (
    <div className="flex align-center justify-right" style={{minHeight: '50px'}} key={fieldKey}> 
      <div className="title2" style={{marginRight: '10px'}}>
        {fieldState.name} 
      </div>
      <div>
        <TextField 
          variant="outlined" 
          onChange={handleOnChange}
          key={fieldKey} 
          value={textFieldState}
          onBlur={(e) => handleBlur(e, fieldKey)}  
          label={fieldState.type}
          size="small"
        />
      </div>
    </div>
  )
};

export default PostField;
