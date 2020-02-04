import React, {useState} from "react";
import "./style.css";
import PostField from '../PostField'
import { Button } from '@material-ui/core';
import { postNewRow } from '../../../services'
import _ from 'lodash'


const PostDataRow = ({ fields, apiInfo }) => {
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

    async function handleSubmit (e) {
      e.preventDefault();

      const newRow = _.reduce(fieldsState, (accum, field) => {
        return {...accum, [field.name]:field.value}
      },{})
      
      console.log('FieldsState', fieldsState);
      console.log('Object to send', newRow)


      await postNewRow(newRow, apiInfo );


    }
    
  return (
    <div>
      <div className="title2">Insert Data</div>
      <form onSubmit={handleSubmit}>
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
          type="submit"
          //onClick={() => addFormRow(fieldRows)}>Add Row
          >
          Insert Row

    </Button>
    </form>
    </div>
  )
};

export default PostDataRow;
