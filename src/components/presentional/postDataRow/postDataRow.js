import React, {useState} from "react";
import { connect } from "react-redux";
import "./style.css";
import PostField from '../PostField'
import { Button } from '@material-ui/core';
import { postNewRow } from '../../../services'
import _ from 'lodash'
import DropZone from '../../container/DropZone'
import * as actions from "../../../actions";



const PostDataRow = ({ fields, apiInfo, fetchUserApisAction, refreshRows }) => {
    const initialFieldsState = fields[0].api_fields.map((field) => {
      return { 
          name: field.field_name, 
          type: field.field_type ,
          value:''
      }
    })
    const [fieldsState, setFieldsState] = useState(initialFieldsState)
    
    function handleBlur (event, fieldKey) {
      const newFieldsState = fieldsState.slice();
      newFieldsState[fieldKey].value = event.target.value
      setFieldsState (newFieldsState)
    }

    async function handleSubmit (e) {
      e.preventDefault();

      const newRow = _.reduce(fieldsState, (accum, field) => {

        if (field.type === 'Number' && !/[0-9.,]/.test(field.value)) {
          window.alert('Please check that all your input fields are of the corrct type.')
          return;
        } else if (field.type === 'Boolean' && (field.value !== 'true' || field.value !== 'false')) {
          window.alert('Please check that all your input fields are of the corrct type.');
          return
        }
        return {...accum, [field.name]:field.value}
      },{})
      
      console.log('FieldsState', fieldsState.length);
      console.log('Object to send', newRow.length)

      if (Object.keys(newRow).length !== fieldsState.length) return;

      await postNewRow(newRow, apiInfo );
      refreshRows(newRow);
      console.log(initialFieldsState)
      setFieldsState(initialFieldsState)
    }
    
  return (
    <div className="flex justify-space-between">
      <form onSubmit={handleSubmit}>
    {fieldsState.map((_, fieldKey)=> {
      console.log('fieldsState[fieldKey: ', fieldsState[fieldKey])
      return  (
        <PostField 
          fieldKey={fieldKey}
          fieldState={fieldsState[fieldKey]} 
          handleBlur={handleBlur} 
          key={fieldKey} 
        />
      )
    })}
    <div className="flex align-center justify-right" style={{marginTop:'10px'}}>
    <Button
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          //onClick={() => addFormRow(fieldRows)}>Add Row
          >
          Insert Row

    </Button>
    </div>
    </form>
    <DropZone refreshRows={refreshRows}/>
    
    </div>
  )
};

export default connect(_, actions)(PostDataRow);

