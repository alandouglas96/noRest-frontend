import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import './style.css';

const initialState = {
  email: '',
  password: '',
}
export const Login = (props) => {
  const [state, setState] = useState(initialState);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BACKEND_URL}/webapp/login`;
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
    .then(()=> props.fetchUser())
    .then(() => props.history.push('/userDashboard'))
    .catch(e => {
      console.log('Error on Post Request');
      console.error(e);
    });
  }

  return (
    <div className="flex-column align-center box">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="loginContainer flex-column align-center">
        <div className="minHeight">
          <TextField
            label="email"
            name="email"
            onChange={handleChange}
            value={state.email}
            size="small"
            variant="outlined"
          />
        </div>
        <div className="minHeight">
          <TextField
            label="password"
            name="password"
            onChange={handleChange}
            type='password'
            value={state.password}
            size="small"
            variant="outlined"
          />
        </div>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>Login</Button>
      </form>
      <div className="flex-column align-center box">Don't you have an account?
        <div style={{height: '10px'}}></div>
        <Link to="/signUp">
         <Button variant="outlined" color="primary">Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}

export default connect(null, actions)(withRouter(Login));
