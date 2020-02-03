import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import _ from 'lodash';
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FieldRow from "../../presentional/CreateApiFormRow/CreateApiFormRow";

import * as actions from '../../../actions';

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
  const { userApis, deleteApi, deleteApiData, generateNewKeys, history, fetchUserApisAction } = props;
  const apiName = props.match.params.apiName;
  const currentApi = userApis.find(api => api.api_name === apiName);
  let publicVar;

  // STYLE-START
  const classes = useStyles();
  const inputLabel = React.useRef(10);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  // STYLE-END

  const [state, setState] = useState({
    public: "",
    api_name: "",
    description: "",
    api_key: "",
    api_secret_key: "",
    api_fields: []
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setState(state => ({ ...state, [name]: value })); // How to push fields into object
  };

  const handleCancel= () => {
    setState({
      public: "",
      api_name: "",
      description: "",
      api_key: "",
      api_secret_key: "",
      api_fields: []
    })
    history.push(`/apiDetails/${currentApi.api_name}`);
  }

  const onSave = event => {
    event.preventDefault();
    const token = localStorage.token;

    const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/${currentApi.api_name}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };
    fetch(url, options)
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          response.json().then(result => window.alert(result.error));
          throw new Error("bypass");
        } else {
          return response;
        }
      })
      .then(
        setState({
          public: "",
          api_name: "",
          description: "",
          api_key: "",
          api_secret_key: "",
          api_fields: []
        })
      )
      .then(res => res.json())
      .then(data => {
        history.push(`/apiDetails/edit/${data.api_name}`)
      })
      .then(() => fetchUserApisAction())
      .catch(error => {
        if (error.message !== "bypass")
          console.error("Error on editing API:", error);
      });
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
                    {publicVar}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={state.public}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                    name="public"
                  >
                    <MenuItem value={true}>Public</MenuItem>
                    <MenuItem value={false}>Private</MenuItem>
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
                onClick={() => handleCancel()}
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
                onClick={onSave}
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
              <input
                type="text"
                name="api_name"
                placeholder="Insert a name..."
                value={state.api_name}
                onChange={handleChange}
                required
              ></input>
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
                  onClick={() => handleCancel()}
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
                  onClick={onSave}
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
              <input
                type="text"
                name="description"
                placeholder="Insert description..."
                value={state.description}
                onChange={handleChange}
                required
              ></input>
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
                  onClick={() => handleCancel()}
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
                  onClick={onSave}
                >
                  <span className="ApiEdit-Card-buttons-text">SAVE</span>
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
                  <span className="ApiEdit-Card-content-content">
                    {currentApi.api_key}
                  </span>
                </div>
                <div className="ApiEdit-Card-content-item">
                  <span className="ApiEdit-Card-content-title">
                    API SECRET KEY:
                  </span>
                  <span className="ApiEdit-Card-content-content">
                    {currentApi.api_secret_key}
                  </span>
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
                  height: "40px",
                  margin: "20px"
                }}
                onClick={() => generateNewKeys(currentApi.api_name, history)}
              >
                <span className="ApiEdit-Card-buttons-text">
                  GENERATE NEW KEYS
                </span>
              </Button>
            </div>

            <div className="ApiEdit-Card-content-keys1">
              <span className="ApiEdit-Card-content-title">
                Generate your own keys:
              </span>
              <div className="ApiEdit-Card-content-keys2">
                <div className="ApiEdit-Card-content-item">
                  <span className="ApiEdit-Card-content-title">API KEY:</span>
                  <input
                    type="text"
                    name="api_key"
                    placeholder="Insert new key..."
                    value={state.api_key}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="ApiEdit-Card-content-item">
                  <span className="ApiEdit-Card-content-title">
                    API SECRET KEY:
                  </span>
                  <input
                    type="text"
                    name="api_secret_key"
                    placeholder="Insert new secret key..."
                    value={state.api_secret_key}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
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
                  onClick={() => handleCancel()}
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
                  onClick={onSave}
                >
                  <span className="ApiEdit-Card-buttons-text">SAVE</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="ApiEdit-Card">
          <div className="ApiEdit-Card-title">Edit API Fields</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-item">
              {/* {currentApi.api_fields.map((row, rowKey) => {
                return (
                  <FieldRow
                    handleChange={handleChange}
                    // handleSelectChange={handleSelectChange}
                    // deleteRow={deleteRow}
                    fieldTypeName={`fielTypeName${rowKey}`}
                    fieldName={`fieldName${rowKey}`}
                    fieldAllowName={`fielTypeName${rowKey}`}
                    rowId={rowKey}
                    key={rowKey}
                    // fieldRows={fieldRows}
                    error={row.error}
                    touched={row.touched}
                  />
                );
              })} */}
              EDITABLE TABLE PENDING
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
                  onClick={() => handleCancel()}
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
                  onClick={onSave}
                >
                  <span className="ApiEdit-Card-buttons-text">SAVE</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="ApiEdit-Card">
          <div className="ApiEdit-Card-title">Danger Zone</div>
          <div className="danger-zone">
            {/* <div className="ApiEdit-Card-content-item">DANGER ZONE</div> */}

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
                  onClick={() => deleteApiData(currentApi.api_name, history)}
                >
                  <span className="ApiEdit-Card-buttons-text">
                    DELETE API DATA
                  </span>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#E85F48",
                    width: "150px",
                    height: "40px"
                  }}
                  onClick={() => deleteApi(currentApi.api_name, history)}
                >
                  <span className="ApiEdit-Card-buttons-text">
                    DELETE API
                  </span>
                </Button>
              </div>
            </div>
            <div className="ApiEdit-Card-content-redText">
              <p>Careful! Deleting your API or the data in it is a permanent</p>
              <p>action. You won't be able to retrieve any of the information</p>
              <p>stored in the database we provide. Be sure to make a safe</p>
              <p>copy of the data if needed.</p>
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

export default connect(mapStateToProps, actions)(ApiEdit);
