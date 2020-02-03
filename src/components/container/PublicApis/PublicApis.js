import React from 'react';
import { connect } from "react-redux";
import { setPublicApisAction } from "../../../actions/";
import ApiCardPublic from '../../presentional/ApiCardPublic';

import './style.css';

const PublicApis = (props) => {

  // const { setPublicApis } = props;

  // useEffect(() => {
  //   setPublicApis();
  // }, []);

  return (
    <div className="box flex-column" id="PublicApisContainer">
      <div className="PublicTitle">Browse Public APIs</div>
      <div className="PublicApis">
        {props.publicApis.length 
          ?
            props.publicApis.map(el => (
              <ApiCardPublic apiInfo={el} key={el._id} />
            ))
          : 
            <div>Nothing to show yet</div>
        }  
      </div>
    </div>
  );  
}

const mapStateToProps = state => ({
  publicApis: state.publicApis
});

const mapDispatchToProps = dispatch => ({
  setPublicApis: () => dispatch(setPublicApisAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicApis);