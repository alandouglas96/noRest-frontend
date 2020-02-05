import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from 'react-router'

import "./style.css";

const BackButton = ({history}) => {
  function goBack () {
    history.goBack();
  }
  return (
    <Button onClick={goBack} color="secondary" variant="contained">
      Back
    </Button>
  );
};

export default withRouter(BackButton);
