const initialState = {
  rows: {
    '123drfdsf': {
      valueType: 'String',
      error: 'no',
      touch: true
    }
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
