import React from "react";
import { Button } from "@material-ui/core";

import "./style.css";

const CancelSaveButtons = ({ handleCancel, onSave }) => {
  return (
    <div className="flex">
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={onSave}
      >
        SAVE
      </Button>
      <div style={{width:'10px'}}></div>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => handleCancel()}
      >
        CANCEL
      </Button>
  </div>
  );
};

export default CancelSaveButtons;
