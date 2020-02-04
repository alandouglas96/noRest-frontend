import React, {useState} from "react";
import "./style.css";
import PostField from '../PostField'
import { Button } from '@material-ui/core';

const PostDataRow = ({ fields }) => {
    const formatedFields = fields[0].api_fields.map((field) => {
      return { 
          name: field.field_name, 
          type: field.field_type ,
          value:''
      }
    })
    const [fieldsState, setFieldsState] = useState(formatedFields)
    
    function handleBlur (event, fieldKey) {
      const newFieldsState = fieldsState.slice();
      newFieldsState[fieldKey].value = event.target.value
      setFieldsState (newFieldsState)
    }
    
  return (
    <div>
      <div className="title2">Insert Data</div>
    {fieldsState.map((_, fieldKey)=> {
      return  (
        <PostField 
          fieldKey={fieldKey}
          fieldsState={fieldsState} 
          handleBlur={handleBlur} 
          key={fieldKey} 
        />
      )
    })}
    <Button
          size="small"
          variant="contained"
          color="primary"
          //onClick={() => addFormRow(fieldRows)}>Add Row
          >
          Insert Row

    </Button>
    </div>
  )
};

export default PostDataRow;
