import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import CreateApiForm from '../container/CreateApiForm'

const initialState = {
  email: '',
  password: '',
}
function SignUpForm () {
  const [state, setState] = useState(initialState);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log('STATE', state)
    const url = 'http://localhost:3000/webapp/login';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(state)
      };
      fetch(url, options)
        .then(response => response.json())
        .then(body => localStorage.setItem('token', body.token))
        .catch(e => {
          console.log('Error on Post Request');
          console.error(e);
        });
  }


  return (
    <div className="flex-column">
    <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="loginContainer" >
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
        <Button onClick={handleSubmit}>Sing Up</Button>
      </form>
    
    </div>
   
   
  )
}
export default SignUpForm;