import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import './style.css';

const SignUpForm  = (props) => {
  const initialState = {
    email: props.location.email,
    password: '',
    name: '',
  }
  const [state, setState] = useState(initialState);

  function handleChange(event) {
    if (event.keyCode===13) {
      handleSubmit()
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.value
      })
    }
  }
  function handleSubmit() {
    console.log('STATE', state)
    
    const url = process.env.REACT_APP_BACKEND_URL +'/webapp/signup';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(state)
    };

    console.log(url);  
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
    <div className="smallBox">
      <form>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
        <Grid item xs={10}>
          <div className="boldTitle">Sign Up</div>
        </Grid>
        <Grid item xs={10}>
            <TextField
              label="name"
              name="name"
              onChange={handleChange}
              value={state.name}
              key={1}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="email"
              name="email"
              onChange={handleChange}
              value={state.email}
              key={2}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="password"
              name="password"
              onChange={handleChange}
              type='password'
              value={state.password}
              key={3}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>Sign Up</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default connect(null,actions)(SignUpForm);