import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import uuidv1 from "uuid/v1";

import "./style.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FieldRow from "../../presentional/CreateApiFormRow/CreateApiFormRow";
import { Link } from "react-router-dom";


import * as actions from "../../../actions";
import BackButton from "../../presentional/BackButton";
import CancelSaveButtons from "../../presentional/CancelSaveButtons";
import IsPublicSelect from '../../presentional/IsPublicSelect/IsPublicSelect2'

import { objectTransform } from "../../../services/ApiEditServices/objectTransform";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  }
}));

const ApiEdit = props => {
  const {
    userApis,
    deleteApi,
    deleteApiData,
    generateNewKeys,
    history,
    fetchUserApisAction
  } = props;
  let publicVar;
  const apiName = props.match.params.apiName;
  const currentApi = userApis.find(api => api.api_name === apiName);

  const [state, setState] = useState({});

  const setInitialState = useCallback(function initialState(thisCurrentApi) {
    if (thisCurrentApi) {
      return {
        ...state,
        public: thisCurrentApi.public ? "Public" : "Private",
        api_name: "",
        description: "",
        api_key: "",
        api_secret_key: "",
        rows: thisCurrentApi.api_fields.reduce((acc, field) => {
          acc[field._id] = {
            value: field.field_name,
            valueType: field.field_type,
            allowNull: field.allow_null,
            default_value: field.default_value,
            error: ""
          };
          return acc;
        }, {})
      };
    }
    return state;
  }, []);

  useEffect(() => {
    setState(setInitialState(currentApi));
  }, [setInitialState, currentApi]);

  // STYLE-START
  const classes = useStyles();
  const inputLabel = React.useRef(10);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  // STYLE-END

  //====================================================================== ROW HANDLING -- START
  function addNewRow() {
    setState({
      ...state,
      rows: {
        ...state.rows,
        [uuidv1()]: {
          value: "",
          valueType: "String",
          allowNull: true,
          default_value: "",
          error: ""
        }
      }
    });
  }

  function handleRowChange(e, inputName, thisRowId) {
    let error = "";
    if (inputName === "value" && e.target.value === "") {
      error = "*required";
    }

    setState({
      ...state,
      rows: {
        ...state.rows,
        [thisRowId]: {
          ...state.rows[thisRowId],
          [inputName]: e.target.value,
          error: error
        }
      }
    });
  }

  function deleteRow(e, thisRowId) {
    const updatedRows = {};
    Object.assign(updatedRows, state.rows);
    delete updatedRows[thisRowId];

    setState({ ...state, rows: { ...updatedRows } });
  }

  //====================================================================== ROW HANDLING -- START

  const handleChange = event => {
    const { name, value } = event.target;
    setState(state => ({ ...state, [name]: value }));
  };

  const handleCancel = () => {
    history.push(`/apiDetails/${currentApi.api_name}`);
  };

  const onSave = event => {
    event.preventDefault();
    const token = localStorage.token;

    const ApiObjectToSend = objectTransform(state);

    const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/${currentApi.api_name}`;
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ApiObjectToSend)
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
      .then(res => res.json())
      .then(data => {
        history.push(`/apiDetails/edit/${data.api_name}`);
      })
      .then(() => fetchUserApisAction())
      .then(setState(setInitialState(currentApi)))
      .catch(error => {
        if (error.message !== "bypass")
          console.error("Error on editing API:", error);
      });
  };

  if (!currentApi) return null;

  return (
    <>
      <div className="box">
        <div className="bread-crumb">
          <div className="bc">Dashboard / API Details / Edit API</div>
          <Link to={`/apiDetails/${currentApi.api_name}`}>
            <Button 
              color="secondary" 
              variant="contained"  
              style={{marginRight:'10px'}}
            >
              Back
            </Button>
          </Link>
        </div>
        <div className="box2">
        {/* <div className="ApiEdit-alert-box">
          <div className="title4">
            <p>
              Warning! You are in edit mode, be careful with your changes as
              some data may be lost forever.
            </p>
            <p>We recommend you backup your data before making any changes.</p>
          </div>
        </div> */}
        
          <div className="bigTitle">{currentApi.api_name}</div>
          <div className="flex">
            <div className="title2">Endpoint:</div>
            <div style={{width:'10px'}}></div>
            <div className="title3">
              https://no-rest-api.herokuapp.com/api/{currentApi.api_name}
            </div>
          </div>
        <div className="ApiEdit-Card">
          <div className="CreateApiForm-title">Change API Public Status</div>
          <div className="ApiEdit-Card-content flex align-center ">
            <div>
            <div className="ApiEdit-Card-content-item">
              <span className="title2">
                Current API Status:
              </span>
              <div style={{width:'10px'}}></div>
              <span className="title3">{publicVar}</span>
            </div>
            <div className="ApiEdit-Card-content-item">
              <div className="flex align-center">
                <div>
                  <span className="title2">
                    New API Status
                  </span>
                </div>
                <div style={{width:'10px'}}></div>
                
                  <IsPublicSelect 
                    value={state.public || ""}
                    handleChange={handleChange}
                    name="public"
                    label={state.public}
                    />
               
              </div>
            </div>
            <div className="ApiEdit-Card-content-redText">
              <p>
                Remember if your API is set to Private, it won't be possible to
                make GET requests and see the date without the KEYS.</p>
            </div>
            <CancelSaveButtons onSave={onSave} handleCancel={handleCancel}/>
              </div>
            
            
            
          </div>
        </div>
        <div className="ApiEdit-Card">
          <div className="CreateApiForm-title">Change API Name</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-item">
              <span className="title2">
                Current API Name:
              </span>
              <div style={{width:'10px'}}></div>
              <span className="title3">
                {currentApi.api_name}
              </span>
            </div>
            <div className="ApiEdit-Card-content-item flex-column align-center">
              <span className="title2">New API Name:</span>
              <div style={{width:'10px'}}></div>
              <input
                style={{minHeight:'40px', padding:'5px', fontSize:'1em'}}
                type="text"
                name="api_name"
                placeholder="Insert a name..."
                value={state.api_name || ""}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="ApiEdit-Card-item flex">
              <span className="title2">New endpoint:</span>
              <div style={{width:'10px'}}></div>
              <span className="title3">https://no-rest-api.herokuapp.com/api/{"new-name"}</span>
            </div>
            <div className="ApiEdit-Card-content-redText">
              <p>Careful! Once you change the name of the api the old endpoint will no longer be accessible.</p>
            </div>
            <CancelSaveButtons onSave={onSave} handleCancel={handleCancel}/>
            
          </div>
        </div>
        <div className="ApiEdit-Card">
          <div className="CreateApiForm-title">Change API Description</div>
          <div className="ApiEdit-Card-content">
            <div className="ApiEdit-Card-content-item">
              <div className="title2">
                Current API Description:
              </div>
              <div style={{width:'10px'}}></div>
              <div className="title3">
                {currentApi.description}
              </div>
            </div>
            <div className="ApiEdit-Card-content-item flex align-center">
              <div className="title2">
                New API Description:
              </div>
              <div style={{width:'10px'}}></div>
              <input
                style={{minHeight:'40px', padding:'5px', fontSize:'1em'}}
                type="text"
                name="description"
                placeholder="Insert description..."
                value={state.description || ""}
                onChange={handleChange}
                required
              ></input>
            </div>
             <CancelSaveButtons onSave={onSave} handleCancel={handleCancel}/>
          </div>
        </div>
        <div className="ApiEdit-Card">
          <div className="CreateApiForm-title">Generate new keys</div>
          <div className="ApiEdit-Card-content">
                  <div className="title2">API KEY:</div>
                  <div className="slim title3">{currentApi.api_key}</div>
                  <div>
                  <div style={{minHeight:'10px'}}></div>
                  <div className="title2">
                    API SECRET KEY:
                  </div>
                  <div className="title3 slim">
                    {currentApi.api_secret_key}
                  </div>
                </div>
            <div className="ApiEdit-Card-content-redText">
              <p>Careful! If you generate new keys, the old ones will stop working. You may have to update your application or code to fix it.</p>
            </div>
            <div>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{
                  width: "300px",
                  height: "40px",
                  margin: "0px"
                }}
                onClick={() => generateNewKeys(currentApi.api_name, history)}
              >
                  GENERATE NEW KEYS
              </Button>
            </div>
            <div className="ApiEdit-Card-content-keys1">
              <span className="title2 bold" style={{marginTop:'20px', marginBottom:'10px'}}>
                Generate your own keys:
              </span>
              <div className="ApiEdit-Card-content-keys2">
                <div className="ApiEdit-Card-content-item flex align-center">
                  <span className="title2">NEW API KEY:</span>
                
                  <div style={{width:'10px'}}></div>
                  <input
                    style={{minHeight:'40px', padding:'5px', fontSize:'1em'}}
                    type="text"
                    name="api_key"
                    placeholder="Insert new key..."
                    value={state.api_key || ""}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="ApiEdit-Card-content-item flex align-center">
                  <span className="title2">
                    NEW API SECRET KEY:
                  </span>
                  <div style={{width:'10px'}}></div>
                  <input
                    style={{minHeight:'40px', padding:'5px', fontSize:'1em'}}
                    type="text"
                    name="api_secret_key"
                    placeholder="Insert new secret key..."
                    value={state.api_secret_key || ""}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <CancelSaveButtons onSave={onSave} handleCancel={handleCancel}/>
          </div>
        </div>
        <div className="ApiEdit-Card">
          <div className="CreateApiForm-title">Edit API Fields</div>
            <div className="ApiEdit-fieldsTable">
              {/* <div className="ApiEdit-Card-content-item"> */}
              <div className="flex-column align-center">
                {_.map(state.rows, (row, rowKey) => {
                  return (
                    <FieldRow
                      handleChange={handleRowChange}
                      deleteRow={deleteRow}
                      rowId={rowKey}
                      key={rowKey}
                      fieldRows={state}
                      touched={false}
                    />
                  );
                })}
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => addNewRow()}
                >
                  Add Row
                </Button>
                  <div style={{margin:'10px'}}></div>
                <CancelSaveButtons onSave={onSave} handleCancel={handleCancel}/>
              </div>
            </div>
        </div>
        <div className="ApiEdit-Card">
          <div className="CreateApiForm-title">Danger Zone</div>
          <div className="ApiEdit-alert-box">
            {/* <div className="ApiEdit-Card-content-item">DANGER ZONE</div> */}
            <div className="flex justify-center">
              <div className="ApiEdit-Card-buttons">
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  style={{
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
                  color="secondary"
                  style={{
                    width: "150px",
                    height: "40px"
                  }}
                  onClick={() => deleteApi(currentApi.api_name, history)}
                >
                  <span className="ApiEdit-Card-buttons-text">DELETE API</span>
                </Button>
              </div>
            </div>
            <div className="ApiEdit-Card-content-redText">
              <p>Careful! Deleting your API or the data in it is a permanent action. You won't be able to retrieve any of the information stored in the database we provide. Be sure to make a safe copy of the data if needed.</p>
            </div>
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
