import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import MuiInput from '../presentional/MuiInput';
import MuiSelect from '../presentional/MuiSelect';

const SignupSchema = Yup.object().shape({
  fieldName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  fieldType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function validateApiName(value) {
  let error; //fetch to database and find exisiting api name
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

export default () => {
  const classes = useStyles();
  return (
  <div>
    <div>
      <h1>Create Api Form</h1>
      <Formik
        initialValues={{
          fieldName: '',
          fieldType: 'String'
        }}
        validationSchema={SignupSchema}
        
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <div className="flex">
              <Field name="fieldName" label="Api Name" component={MuiInput} validate={validateApiName} />

              <Field name="fieldType"component={MuiSelect}/>

            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  )
}