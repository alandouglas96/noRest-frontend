import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ApiCard from "../../presentional/ApiCard/ApiCard";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import "./style.css";

const ApisDisplay = props => {

  return (
    <>
    <div >
      { props.userApis.userApis.length ? null :
        <div className="flex-column align-center">
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
        </div>
        }
        {
          props.userApis.userApis.length ? 
          <>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              spacing={4}
              style={{margin:'0px', maxWidth:'100%', backgroundColor:'#f8f8f8'}}
            >
              <Grid item xs={3}>
                <div className="title2">API NAME</div>
              </Grid>
              
              <Grid item xs={5}>
                <div className="title2">DESCRIPTION</div>
              </Grid>
              <Grid className="flex justify-center" item xs={2}>
                <div className="title2">ROWS</div>
              </Grid>
              <Grid className="flex justify-center" item xs={2}>
                <div className="title2">
                STATUS
                </div>
              </Grid>
            </Grid>
          {props.userApis.userApis.map(el => (
            <Link key={el._id} to={`/apiDetails/${el.api_name}`}>
              <ApiCard apiInfo={el} key={el._id} />
            </Link>
          ))}
          </>
         : null
        }
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  userApis: state.userApis
});

export default connect(mapStateToProps, null)(ApisDisplay);
