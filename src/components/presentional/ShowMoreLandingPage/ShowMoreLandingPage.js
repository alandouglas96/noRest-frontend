import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserDashBoard from '../UserDashboard/UserDashboard'
import diagram from '../../../static/media/diagram.png'

import './style.css';

function ShowMoreLandingPage () {

  return (
  
    
      <div className="box flex-column justify-left align-left" style={{background: 'transparent',margin: '0px', padding: '0px', marginBottom:'150px'}}>
        <div className="bigTitle">How does NoRest work</div>
        <div className="flex align-center justify-center" style={{width: '100%'}}>
        <img src={diagram} />
        </div>
    
   </div>
  
  
  )
}

export default ShowMoreLandingPage;