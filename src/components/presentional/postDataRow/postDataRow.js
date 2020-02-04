import React, {useState} from "react";
import "./style.css";
import PostField from '../PostField'

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
    fieldsState.map((_, fieldKey)=> {
      return  (
        <PostField 
          fieldKey={fieldKey}
          fieldsState={fieldsState} 
          handleBlur={handleBlur} 
          key={fieldKey} 
        />
      )
    })
  )
};

export default PostDataRow;
