import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';

const initialState = {
  email: '',
  name: '',
  password: '',
}
export const LoginForm = () => {
  const [state, setState] = useState(initialState);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(state)
  }

  return (
    <div className="flex-column">
      <form onSubmit={handleSubmit} >
        <div>
          <TextField 
            label="name" 
            name="name" 
            onChange={handleChange}
            value={state.name} 
            key={1}
          />
        </div>
        <div>
          <TextField 
            label="email" 
            name="email" 
            onChange={handleChange}
            value={state.email} 
            key={2}
          />
        </div>
        <div>
          <TextField 
            label="password" 
            name="password" 
            onChange={handleChange}
            type='password' 
            value={state.password} 
            key={3}
          />
        </div>
        <Button onClick={handleSubmit}>Sing In</Button>
      </form>
    </div>
   
   
  )
}