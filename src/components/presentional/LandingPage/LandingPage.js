import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShowMoreLandingPage from '../ShowMoreLandingPage'

import './style.css';

function LandingPage (props) {
  const [emailState, setEmailState] = useState('');
  const [showMoreState, setShowMoreState] = useState(false)

  function handleEmailChange (e) {
    setEmailState(e.target.value)
  }

  function toggleLearnMore (event) {
    setShowMoreState(!showMoreState);
  }

  function handleEnter (event) {
    if (event.keyCode===13) {
      props.history.push({pathname: "/signup" , email: emailState})
    }  
  }


  return (
    <>
    <div className="box" style={{marginBottom:'0px'}}>
      <div className="box2">
      <div className="flex backgroundImage">
        <div className="flex-column">
          <div className="bigTitle"> Create Your own APIs, serverless.</div>
          <div className="bigTitle"> All the power, none of the hassle.</div>
          <div className="bigTitle"> Just Simple.</div>
          <div className="flex" style={{marginTop: '20px'}}>
            <TextField 
              label="Type your email" 
              onChange={handleEmailChange}
              size="small" 
              value= {emailState}
              style={{width: '250px'}}
              onKeyUp={handleEnter}
              variant="outlined">
            </TextField>
            <div style={{minWidth: '10px'}}></div>
            <div className="flex align-center">
              <Link to={{pathname: "/signup" , email: emailState}}>
                <Button 
                  size="medium" 
                  variant="contained" 
                  color="secondary"
                  style={{width:'150px'}}
                  >
                    Do it!
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="landingPageRight">
        </div>
      </div>
      </div>
    </div>
    <div className=" flex justify-center" style={{background:'transparent', marginTop: '0px', paddingTop: '0px'}}>{ showMoreState ? null : <Button onClick={toggleLearnMore}>Learn More</Button>}</div>
    {showMoreState ? <ShowMoreLandingPage/> : null}
    </>
  )
}

function mapStateToProps({ auth }) {

  return { auth };
}

export default connect(mapStateToProps, null)(LandingPage);