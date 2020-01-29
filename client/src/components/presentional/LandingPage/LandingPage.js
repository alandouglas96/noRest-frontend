import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserDashBoard from '../UserDashboard/UserDashboard'

import './style.css';

function LandingPage (props) {
  const [emailState, setEmailState] = useState('')

  function handleEmailChange (e) {
    setEmailState(e.target.value)
  }

  if (props.auth)
  return <UserDashBoard/>

  return <div className="landing-page, flex-column box">
    <div style={{margin: '10px'}}>
      <h1> Create Your own APIs, serverless.</h1>
      <h1> All the power, none of the hassle.</h1>
      <h1> Just Simple.</h1>
    </div>
    <div className="flex justify-center">
      <TextField 
        label="Type your email" 
        onChange={handleEmailChange}
        size="small" 
        value= {emailState}
        variant="outlined">
      </TextField>
      <div style={{minWidth: '10px'}}></div>
      <div className="flex align-center">
        <Link to={{pathname: "/signup" , email: emailState}}>
          <Button size="medium" variant="outlined" color="primary">Do it!</Button>
        </Link>
      </div>
    </div>
  </div>
}

function mapStateToProps({ auth }) {
  console.log('Auth->', auth);

  return { auth };
}

export default connect(mapStateToProps, null)(LandingPage);