const initialState = {
  rows: {
    '123drfdsf': {
      valueType: 'String',
      error: 'no',
      touch: true
    }
  }
}

function reducer(state, action) {
  switch(action.type) {
    case 'SET_ERROR': 
    return {
      ...state,
      error: 'error'
    }

    case 'SET_VALUE':
      return {
        ...state,
        value: action.value
      }
    
      case 'CREATE_TYPE_FIELD': {
        ...state,
        [uuid()]: {
          value: 'String',
          error: ''
        } 
      }

      default: 
        return state
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({type: 'CREATE_NEW_ROW'})
  })

  const checkForm = () => {

  }
  

  return map(state, field => 
    <Field 
      value={field.value}
      error={field.error}
      touch={field.touch}
      onChange={
      (e) => {
        dispatch({type: 'SET_VALUE', value: e.value})
      }} 
      onBlur={}
    />
}
