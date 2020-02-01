import { SET_ROWS_CREATE_API } from '../actions/types';
const FIELD_ROWS_INITIAL_STATE = {
  rows: {
    [numberOfFields + '-' + uuid()]: {
      valueType: 'String',
      error: '',
      touch: false,
      value: '',
      allowNull: true,
    }
  }}


export default function(fieldRows = FIELD_ROWS_INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_NEW_ROW':
    return  {
      rows:
      {
        ...fieldRows.rows, [(numberOfFields) + '-' + uuid()]: {
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
        ...fieldRows.rows,
        [action.payload.rowId]: {
          ...fieldRows.rows[action.payload.rowId],
          [action.payload.inputName]: action.payload.value,
          touched: true,
          error: action.payload.error
        }
      }
    }
    
    case 'DELETE_ROW':
      const updatedRows = _.reduce(fieldRows.rows,(acc,element, key) => {
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
      return fieldRows
  }
  }
}
