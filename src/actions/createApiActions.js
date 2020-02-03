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

  export const submitApiAction = () => async dispatch => {
    console.log('INSIDE ACTION')
    dispatch(fetchUserApisAction())
}

    //make dispatch
  


