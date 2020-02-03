import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userApisReducer from './userApisReducer';
import createApisReducer from './createApiReducer';
import publicApisReducer from './publicApisReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm, // Not in use?
  userApis: userApisReducer,
  fieldRows: createApisReducer,
  publicApis: publicApisReducer
});
