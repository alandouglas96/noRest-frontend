import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Grid from '@material-ui/core/Grid';

import './style.css';

const initialState = {
  email: '',
  password: '',
}
export const Login = (props) => {
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
    <div className="smallBox">
      <form>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
          <div className="boldTitle">Login</div>
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
            />
            <div className="alignRight">
              <a href=''>Forgot your password?</a>
            </div>
          </Grid> 
          <Grid item xs={10}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
          </Grid>
          <Grid item xs={12}>
            Don't have an Account?
          </Grid>
          <Grid item xs={10}>
            <Link to="/signUp">
              <Button variant="contained" color="secondary">Sign Up</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
      
    
  )
}

export default connect(null, actions)(withRouter(Login));
