import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./style.css";
import _ from 'lodash'

const PostDataRow = ({ fields }) => {
  
    //console.log('Fields: ', fields[0].api_fields)

    const formatedFields = fields[0].api_fields.map((field) => {
      return { 
          name: field.field_name, 
          type: field.field_type ,
          value:''
      }
    })
    const [fieldsState, setFieldsState] = useState(formatedFields)
    console.log('FieldsState: ', fieldsState)
    function handleBlur (event, fieldKey) {
      
      const newOne = {...fieldsState, [fieldKey]: {
        ...fieldsState[fieldKey], value:event.target.value
      }} 
      console.log('here', newOne)
    }

    function handleOnChange (e) {

    }
    
    const print = fieldsState.map((field, fieldKey, obj)=> {
      //console.log('Field in map', field)
      //console.log('Key in map', fieldKey)
      //console.log('Rest in map', fieldsState[fieldKey])
    return  (
      //<postField handleBlur={handleBlur} key={fieldKey}/>
      <div key={fieldKey}> 
        
      {fieldsState[fieldKey].name} : 
      {
        <TextField 
        variant="outlined" 
        key={fieldKey} 
      
        onBlur={(e) => handleBlur(e, fieldKey)}  
         label={fieldsState[fieldKey].type}
        />
        }
      </div>
      )
    })

  
    
   // console.log('FieldNames', formatedFields);
  


  return (
    print
  )
    
};

export default PostDataRow;
