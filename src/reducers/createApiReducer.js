import _ from 'lodash';
import uuid from 'uuid';

//Reducer for the dynamic form, for the state of the field rows only in createApiForm
const FIELD_ROWS_INITIAL_STATE = {
  rows: {
    [uuid()]: {
      valueType: 'String',
      error: '',
      touch: false,
      value: '',
      allowNull: true,
    }
  }}

export default function(state = FIELD_ROWS_INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_NEW_ROW':
    return  {
      rows:
      {
        ...state.rows, [uuid()]: {
        valueType: 'String',
        error: '',
        touch: false,
        value: '',
        allowNull: true,
        description: ''
        }
      }
    }
    case 'SET_ROW':
    return  {
      rows:
      {
        ...state.rows,
        [action.payload.rowId]: {
          ...state.rows[action.payload.rowId],
          [action.payload.inputName]: action.payload.value,
          touched: true,
          error: action.payload.error
        }
      }
    }
    case 'DELETE_ROW':
      const updatedRows = _.reduce(state.rows,(acc,element, key) => {
        if (key !== action.payload) {
          acc[key]=element
        }
        return acc
      }, {});

      return {
        rows:
        {
          ...updatedRows,
        }
      }
    
    default:
      return state
  }
  }

