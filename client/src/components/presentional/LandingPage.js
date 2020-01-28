import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

function LandingPage (props) {

  if (props.auth) 

  return <div className="landing-page">
    <div> Create Your own APIs, serverless.</div>
    <div> All the power, none of the hassle</div>
    <div> Just Simple.</div>
    <input></input>
    <button>Do it!</button>
    <Link to="/createApi">
    <Button>Create Api</Button>
    </Link>
    
  </div>

  return <div className="landing-page">
    <div> Create Your own APIs, serverless.</div>
    <div> All the power, none of the hassle</div>
    <div> Just Simple.</div>
    <input></input>
    <Link to={{pathname: "/signup" , email: 'emailinserted'}}>
    <Button>Do it!</Button>
    </Link>
    
    
  </div>
}

function mapStateToProps({ auth }) {
  console.log('Auth->>>>>>>>>>>>>>', auth);
  
  return { auth };
}

export default connect(mapStateToProps,actions)(LandingPage);