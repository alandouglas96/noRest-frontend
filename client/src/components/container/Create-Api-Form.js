import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import MuiInput from '../presentional/MuiInput';
import MuiSelect from '../presentional/MuiSelect';





const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const FieldRow = ({fieldName, fieldTypeName}) => {
 return <div className="flex">
              <Field
              
              name={fieldName} 
              label="Api Name" 
              component={MuiInput} 
              validate={validateApiName} />

              <Field value={'String'} name={fieldTypeName} component={MuiSelect}/>

            </div>
}

function validateApiName(value) {
  let error; //fetch to database and find exisiting api name
  console.log('VALUE',value);
  
  if (value === '') {
    error = 'my error';
  }
  return error;
}

export default () => {
  const [formSchema, setFormSchema] = useState({})
  const [initialSchema, setInitialSchema] =  useState({})
  const [fieldRows, setFieldRows] = useState(1)
  const classes = useStyles();

  useEffect(()=>{
    const shape = Array(fieldRows)
      .fill('')
      .reduce((accum, row, idx) => {
        return {
          ...accum, 
          [`fieldName${idx}`]: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
        }
    }, {})
    setFormSchema(Yup.object().shape(shape));

    const initialSchemaTemp = Array(fieldRows)
    .fill('')
    .reduce((accum, row, idx) => {
      return {
        ...accum, 
        [`fieldName${idx}`]: 'he',
        [`fieldTypeName${idx}`]: 'String'
      }
  }, {})
    setInitialSchema(initialSchemaTemp)


    },[fieldRows])

  return (
    <div>
      <div>
        <h1>Create Api Form</h1>
        <Formik
        validateOnBlur
          initialValues={{
            fieldName0: '',
            fieldTypeName0: 'String'
          }}
          validationSchema={formSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({validateForm}) => (
            <Form>
              {Array(fieldRows).fill(' ').map((_, idx) => (
                <FieldRow 
                  fieldTypeName={`fielTypeName${idx}`} 
                  fieldName={`fieldName${idx}`} 
                />
              ))}
              <Button onClick={() => setFieldRows(fieldRows + 1)}>Add Row</Button>
              <Button type="submit">Submit</Button>
              <Button onClick={() => validateForm().then(() => console.log('blah'))}>
            Validate All</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}