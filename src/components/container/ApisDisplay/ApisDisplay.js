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
          <div className="no-apis">No APIs yet. Why don't you create one?</div>
        }
      <div className="ApiDisplay">
        {
          props.userApis.userApis.length ? (
          props.userApis.userApis.map(el => (
            <ApiCard apiInfo={el} key={el._id} />
          ))
        ) : null
        }
        <div className="ApiDisplay-CreateApi">
          <span className="ApiDisplay-CreateApi-title">Create a new API</span>
          <Link to="/createApi">
            <Button
              
              color="primary"
              variant="contained"
              style={{
                    width: "150px",
                  }}
              >
              Do it!
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </>
  );
};


const mapStateToProps = state => ({
  userApis: state.userApis
});

export default connect(mapStateToProps, null)(ApisDisplay);
