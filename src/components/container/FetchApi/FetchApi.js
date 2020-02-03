import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchUserApisAction } from "../../../actions/";


function FetchApi (props) {
  const { fetchUserApis } = props;
  
  useEffect(() => {
    console.log('GHOST')
    fetchUserApis();
  }, [fetchUserApis]);

  return(null);
}

const mapDispatchToProps = dispatch => ({
  fetchUserApis: () => dispatch(fetchUserApisAction())
});

export default connect(null, mapDispatchToProps)(FetchApi);