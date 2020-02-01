import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApiCard from "../../presentional/ApiCard/ApiCard";
import { connect } from "react-redux";

import "./style.css";

const ApisDisplay = props => {


  return (
    <>
    <div className="flex-column align-center">
      { props.userApis.userApis.length ? null :
         <>
          <div className="title2">No APIs yet. Why don't you create one?</div>
          <div className="ApiDisplay-CreateApi align-center">
          <div className="ApiDisplay-CreateApi-title">Create a new API</div>
          <Link to="/createApi">
            <Button
              
              color="secondary"
              variant="contained"
              style={{
                    width: "150px",
                  }}
              >
              Do it!
            </Button>
          </Link>
        </div>
        </>
        }
      <div className="ApiDisplay">
        {
          props.userApis.userApis.length ? (
          props.userApis.userApis.map(el => (
            <ApiCard apiInfo={el} key={el._id} />
          ))
        ) : null
        }
       
        </div>
      </div>
    </>
  );
};


const mapStateToProps = state => ({
  userApis: state.userApis
});

export default connect(mapStateToProps, null)(ApisDisplay);
