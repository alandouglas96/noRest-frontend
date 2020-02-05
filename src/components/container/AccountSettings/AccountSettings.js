import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import './style.css';


export const AccountSettings = (props) => {

  const initialState = {
    name: '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''  
  }  

  const [state, setState] = useState(initialState);

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmitName(e) {
    e.preventDefault();
    
    const name = state.name;

    // make sure only sending name info
    setState({...initialState, name: name });

    const url = `${process.env.REACT_APP_BACKEND_URL}/webapp/user/edit`;
    const token = localStorage.token;
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(state)
     };

    fetch(url, options)
    .then(response => {
      if (response.status !== 200) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    .then(res => { 
      setState(initialState);
      window.alert('Name changed');
    })
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in fetch Login:', error);
    });
  }

  function handleSubmitPassword(e) {
    e.preventDefault();
    
    // make sure only sending password info
    setState({...state, name: ''});

    // check passwords match
    if (state.newPassword !== state.repeatPassword) {
      window.alert("Passwords don't match");
      setState(initialState);
      return null;
    }

    const url = `${process.env.REACT_APP_BACKEND_URL}/webapp/user/edit`;
    const token = localStorage.token;
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(state)
     };

    fetch(url, options)
    .then(response => {
      if (response.status !== 200) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    .then(res => {
      setState(initialState);
      window.alert('Password changed');
    })
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in fetch Login:', error);
    });
  }

  return (
    <div className="AccountBox">
      <form onSubmit={handleSubmitName}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            <div className="boldTitle">Account Settings</div>
          </Grid>
          <Grid item xs={3}>
            <Link to="/userDashboard">
              <Button fullWidth variant="contained" 
              color="secondary" >Back</Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <div className="semiTitle" id="account-title">Change your Name</div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="new name"
              name="name"
              onChange={handleChange}
              value={state.name}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              style={{width:'100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary" >Change Name</Button>
          </Grid>
          <Grid item xs={12} /> 
        </Grid>
      </form>
      <form onSubmit={handleSubmitPassword}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <div className="semiTitle" id="account-title">Change your password</div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="current password"
              name="oldPassword"
              onChange={handleChange}
              type='password'
              value={state.oldPassword}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              style={{width:'100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="new password"
              name="newPassword"
              onChange={handleChange}
              type='password'
              value={state.newPassword}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              style={{width:'100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="repeat password"
              name="repeatPassword"
              onChange={handleChange}
              type='password'
              value={state.repeatPassword}
              size="small"
              variant="outlined"
              onKeyUp={handleChange}
              style={{width:'100%'}}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary" >Change Passsword</Button>
          </Grid>

        </Grid>
      </form>

    </div>
      
    
  )
}

export default AccountSettings;
