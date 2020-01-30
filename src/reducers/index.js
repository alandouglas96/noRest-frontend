import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userApisReducer from './userApisReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm, // Not in use?
  userApis: userApisReducer
});
