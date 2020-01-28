import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import UserDashBoard from '../presentional/UserDashboard'

function LandingPage (props) {

  if (props.auth) 

  return <UserDashBoard/>

  return <div className="landing-page, flex-column loginContainer">
    <div style={{margin: '50px'}}>
    <div> Create Your own APIs, serverless.</div>
    <div> All the power, none of the hassle</div>
    <div> Just Simple.</div>
    </div>
    <div className="flex justify-center">
    <TextField size="small" label="Your Email" variant="outlined"></TextField>
    <div style={{minWidth: '10px'}}></div>
    <Link to={{pathname: "/signup" , email: 'emailinserted'}}>
    
    <Button variant="outlined" color="primary">Do it!</Button>
    </Link>
    </div>
  </div>
}

function mapStateToProps({ auth }) {
  console.log('Auth->>>>>>>>>>>>>>', auth);
  
  return { auth };
}

export default connect(mapStateToProps,actions)(LandingPage);