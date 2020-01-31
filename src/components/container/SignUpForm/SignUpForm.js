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
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
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

    fetch(url, options)
    .then(response => {
      if (response.status !== 200) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      }
      else return response;
    })
    .then(res => res.json())
    .then(body => localStorage.setItem('token', body.token))
    .then(()=> props.fetchUser())
    .then(()=> props.history.push('/'))
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in fetch SignUp:', error);
    });
  }

  return (
    <div className="smallBox">
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
        <Grid item xs={12}>
          <div className="boldTitle">Sign Up</div>
        </Grid>
        <Grid item xs={12}>
            <TextField
              label="name"
              name="name"
              onChange={handleChange}
              value={state.name}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              style={{width: '100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="email"
              name="email"
              onChange={handleChange}
              value={state.email}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              type="email"
              style={{width: '100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="password"
              name="password"
              onChange={handleChange}
              type='password'
              value={state.password}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              style={{width: '100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="secondary">Sign Up</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default connect(null,actions)(SignUpForm);