import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import CreateApiForm from './CreateApiForm'

const initialState = {
  email: '',
  name: '',
  password: '',
}
export const Login = () => {
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
        .then(response => {
          console.log('respones.body', response.body);
          
          return response.text()
        })
        .then((body) => {
          const withJwt = body;
          localStorage.setItem('token', body);
          console.log('Token----->', withJwt)
        })
        .catch(e => {
          console.log('Error on Post Request');
        });
  }

  return (
    <div className="flex-column">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="loginContainer">
      <div>
          <TextField 
            label="name" 
            name="name" 
            onChange={handleChange}
            value={state.name} 
            key={2}
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
        <Button onClick={handleSubmit}>Login</Button>
      </form>
      <div>Don't you have an account?<Link to="/signUp"><Button>Sign Up</Button></Link></div>
   
    </div>
   
   
  )
}

export default Login;