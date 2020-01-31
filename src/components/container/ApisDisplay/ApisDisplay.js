import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApiCard from "../../presentional/ApiCard/ApiCard";
import { connect } from "react-redux";

import "./style.css";

const ApisDisplay = props => {


  return (
    <>
    <div className="flex-column">
      <div className="ApiDisplay">
        {props.userApis.userApis.length ? (
          props.userApis.userApis.map(el => (
            <ApiCard apiInfo={el} key={el._id} />
          ))
        ) : (
          <div className="no-apis">No APIs yet. Why don't you create one?</div>
        )}
        <div className="ApiDisplay-CreateApi">
          <span className="ApiDisplay-CreateApi-title">Create a new API</span>
          <Link to="/createApi">
            <Button
              size="large"
              variant="contained"
              style={{
                    color: "white",
                    backgroundColor: "#BCDE5F",
                    fontWeight: "400",
                    width: "150px",
                    height: "40px"
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
