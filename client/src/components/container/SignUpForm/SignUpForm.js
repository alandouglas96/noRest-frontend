import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import './style.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function SignUpForm (props) {
  const classes = useStyles();
  const initialState = {
    email: props.email,
    password: '',
    name: '',
  }
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
    const url = 'http://localhost:3000/webapp/signup';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(state)
      };
      fetch(url, options)
        .then(response => response.json())
        .then(body => localStorage.setItem('token', body.token))
        .then(()=> props.fetchUser())
        .then(()=> props.history.push('/'))
        .catch(e => {
          console.log('Error on Post Request Sign Up');
          console.error(e);
        });
  }


  return (
    <div className="flex-column align-center">
    <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="loginContainer flex-column align-center" >

        <div className="minHeight">
          <TextField
            label="name"
            name="name"
            onChange={handleChange}
            value={state.name}
            key={1}
            size="small"
            variant="outlined"
          />
        </div>
        <div className="minHeight">
          <TextField
            label="email"
            name="email"
            onChange={handleChange}
            value={state.email}
            key={2}
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
            key={3}
            size="small"
            variant="outlined"
          />
        </div>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>Sign Up</Button>
      </form>

    </div>
  )
}

export default connect(null,actions)(SignUpForm);