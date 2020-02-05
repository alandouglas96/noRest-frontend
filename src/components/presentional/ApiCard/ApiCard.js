import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./style.css";
import Grid from '@material-ui/core/Grid';

const ApiCard = ({ apiInfo }) => {
  return (
    
    
      <Grid
          container
          justify="flex-start"
          alignItems="center"
          spacing={4}
          className="row upperline"
          style={{margin:'0px', maxWidth:'100%'}}
        >
        <Grid item xs={3}>
          <div className="title3">{apiInfo.api_name}</div>
        </Grid>
       <Grid item xs={5}>
          <div className="title3">{apiInfo.description}</div>
        </Grid> 
        <Grid item xs={2}>
          <div className="title3">{apiInfo.api_row_count}</div>
        </Grid> 
        <Grid className="flex justify-center" item xs={2}>
          <div className="title3">
            {apiInfo.public ? "Public" : "Private"}
          </div>
        </Grid>
      </Grid>
    
  );
};

export default ApiCard;
