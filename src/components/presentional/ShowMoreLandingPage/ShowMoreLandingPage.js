import React from 'react';
import diagram from '../../../static/media/diagram.png'

import './style.css';

function ShowMoreLandingPage () {

  return (
  
    
      <div className="box flex-column justify-left align-left" style={{
        background: 'transparent',
        margin: '0px', 
        padding: '0px', 
        marginBottom:'10px', 
        marginTop:'50px'
        }}>
        <div className="bigTitle">How does NoRest work</div>
        <div className="flex align-center justify-center" style={{width: '100%', marginBottom: '100px'}}>
        <img src={diagram} alt="diagram" />
        </div>
    
   </div>
  
  
  )
}

export default ShowMoreLandingPage;