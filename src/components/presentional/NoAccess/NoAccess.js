import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function NoAccess (props) {

  return (
    <div id="NoAccessBox" className="box">
      <Link to="/">
        <div className="NoAccessEmoji">❌</div>
        <div className="NoAccessText">You don't have permission. Go back to homepage.</div>
      </Link>
    </div>
  );
}

export default NoAccess;