<<<<<<< HEAD
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";
=======
import React from "react";

import './style.css';
>>>>>>> Feat: some styling in general, unified css, style on user dashboard, api details, implementing bread scrumbs

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ApiEdit = props => {
  const { userApis } = props;
  const apiName = props.match.params.apiName;
  const currentApi = userApis.find(api => api.api_name === apiName);
  let publicVar;

  const classes = useStyles();
  const [publicState, setPublicState] = useState("");

  const inputLabel = React.useRef(10);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setPublicState(event.target.value);
  };

  if (!currentApi) return null;

  if (currentApi.public) publicVar = "public";
  else publicVar = "private";

  return (
    <>
      <div className="ApiEdit">
        <h1>Edit Your API</h1>

        <div className="ApiEdit-Warning">
          <div className="ApiEdit-Warning-text">
            <p>
              Warning! You are in edit mode, be careful with your changes as
              some data may be lost forever.
            </p>
            <p>We recommend you backup your data before making any changes.</p>
          </div>
          <div className="ApiEdit-Warning-cross">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <div className="ApiEdit-head">
          <div className="ApiEdit-head-name">{currentApi.api_name}</div>
          <div className="ApiEdit-head-endpoint">
            Endpoint:
            <span className="ApiEdit-head-endpoint-span">
              https://no-rest-api.herokuapp.com/api/{currentApi.api_name}
            </span>
          </div>
          <div className="">
            <Link to={`/apiDetails/${currentApi.api_name}`}>
              <Button
                size="small"
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#3371B0",
                  width: "300px",
                  height: "40px"
                }}
              >
                <span className="ApiDetails-head-button">
                  GO BACK TO DETAILS
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="ApiEdit-Card">
          <div className="ApiEdit-Card-title">Change API Public Status</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-item">
              <span className="ApiEdit-Card-content-title">
                Current API Status :
              </span>
              <span className="ApiEdit-Card-content-content">{publicVar}</span>
            </div>
            <div className="ApiEdit-Card-content-item">
              <span className="ApiEdit-Card-content-title">
                New API Status :
              </span>
              <div className="">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={inputLabel}
                    id="demo-simple-select-outlined-label"
                  >
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={publicState}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value={"public"}>Public</MenuItem>
                    <MenuItem value={"private"}>Private</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="ApiEdit-Card-content-redText">
              <p>
                Remember if your API is set to Private, it won't be possible to
                make GET
              </p>
              <p>requests and see the date without the KEYS.</p>
            </div>

            <div className="ApiEdit-Card-buttons">
              <Button
                size="small"
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#E85F48",
                  width: "150px",
                  height: "40px"
                }}
              >
                <span className="ApiEdit-Card-buttons-text">CANCEL</span>
              </Button>
              <Button
                size="small"
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#B4D173",
                  width: "150px",
                  height: "40px"
                }}
              >
                <span className="ApiEdit-Card-buttons-text">SAVE</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="ApiEdit-Card">
          <div className="ApiEdit-Card-title">Change API Name</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-item">
              <span className="ApiEdit-Card-content-title">
                Current API Name:
              </span>
              <span className="ApiEdit-Card-content-content">
                {currentApi.api_name}
              </span>
            </div>

            <div className="ApiEdit-Card-content-item">
              <span className="ApiEdit-Card-content-title">New API Name:</span>
              <input value=""></input>
            </div>

            <div className="ApiEdit-Card-item">
              <span className="ApiEdit-Card-content-title">New endpoint:</span>
              <span>https://no-rest-api.herokuapp.com/api/{"new-name"}</span>
            </div>

            <div className="ApiEdit-Card-content-redText">
              <p>Careful! Once you change the name of the api the old</p>
              <p>endpoint will no longer be accessible.</p>
              <div className="ApiEdit-Card-buttons">
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#E85F48",
                    width: "150px",
                    height: "40px"
                  }}
                >
                  <span className="ApiEdit-Card-buttons-text">CANCEL</span>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#B4D173",
                    width: "150px",
                    height: "40px"
                  }}
                >
                  <span className="ApiEdit-Card-buttons-text">SAVE</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="ApiEdit-Card">
          <div className="ApiEdit-Card-title">Change API Description</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-item">
              <span className="ApiEdit-Card-content-title">
                Current API Description:
              </span>
              <span className="ApiEdit-Card-content-content">
                {currentApi.description}
              </span>
            </div>

            <div className="ApiEdit-Card-content-item">
              <span className="ApiEdit-Card-content-title">
                New API Description:
              </span>
              <input value=""></input>
            </div>

            <div className="ApiEdit-Card-buttons">
              <div className="ApiEdit-Card-buttons">
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#E85F48",
                    width: "150px",
                    height: "40px"
                  }}
                >
                  <span className="">CANCEL</span>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#B4D173",
                    width: "150px",
                    height: "40px"
                  }}
                >
                  <span className="">SAVE</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="ApiEdit-Card">
          <div className="ApiEdit-Card-title">Generate new keys</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-keys1">
              <span className="ApiEdit-Card-content-title">Current Keys:</span>
              <div className="ApiEdit-Card-content-keys2">
                <div className="ApiEdit-Card-content-item">
                  <span className="ApiEdit-Card-content-title">API KEY:</span>
                  <span className="ApiEdit-Card-content-content">{currentApi.api_key}</span>
                </div>
                <div className="ApiEdit-Card-content-item">
                  <span className="ApiEdit-Card-content-title">API SECRET KEY:</span>
                  <span className="ApiEdit-Card-content-content">{currentApi.api_secret_key}</span>
                </div>
              </div>
            </div>
            <div className="ApiEdit-Card-content-redText">
              <p>Careful! If you generate new keys, the old ones will stop</p>
              <p>working. You may have to update your application or code</p>
              <p>to fix it.</p>
            </div>
            <div>
              <Button
                size="small"
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#3371B0",
                  width: "300px",
                  height: "40px"
                }}
              >
                <span className="">GENERATE NEW KEYS</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  userApis: state.userApis.userApis
});

export default connect(mapStateToProps, null)(ApiEdit);
