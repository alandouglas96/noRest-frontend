import { fetchUserApisAction } from '../actions/index'
import { createApi } from '../services'


export const handleRowChange = (event, inputName, rowId) => dispatch => {
  let error='';
  if ((inputName==='value') && (event.target.value==='')) {
    error = ('*required')
  }
  console.log('event.target.value', inputName)
  dispatch({type: 'SET_ROW', payload: {value: event.target.value, inputName, rowId, error}})
}

export const addFormRow = () => dispatch => {
  console.log('INSIDE SET NEW ROW')
  dispatch({type: 'SET_NEW_ROW'})
  //(numberOfFields => numberOfFields + 1)
  }

  export const deleteRow = (e, rowId) => dispatch => {
    dispatch({type: 'DELETE_ROW', payload: rowId})
  }

  export const setRow = () => dispatch => {
    dispatch({type: 'SET_ROW'})
  }

  export const submitApi = (values, history) => async dispatch => {
    
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api`;
    const token = localStorage.token;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
    };
  
    console.log('Values', JSON.stringify(values))
  
    fetch(url, options)
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          response.json().then(result => window.alert(result.error));
          throw new Error('bypass');
        } else return response;
      })
      .then(res => res.json())
      .then(data => history.push(`/apiDetails/${data.api_name}`))
      .then(data => (dispatch(fetchUserApisAction()), data))
      .then(data => console.log('done', data))
      .catch(error => {
        if (error.message !== 'bypass') console.error('Error in submitting create API:', error);
      });
}

    //make dispatch
  


