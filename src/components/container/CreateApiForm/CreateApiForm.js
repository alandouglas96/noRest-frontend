import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../actions/createApiActions";
// import { fetchUserApisAction } from "../../../actions/";

import FieldRow from "../../presentional/CreateApiFormRow/CreateApiFormRow";
import IsPublicSelect from "../../presentional/IsPublicSelect";

import { handleApiSubmit } from "../../../services/createApiformServices";

import BreadCrumb from "../../presentional/breadcrumps/apiDetailsBC";

import "./style.css";

function CreateApiForm({
  submitApiAction,
  handleRowChange,
  addFormRow,
  deleteRow,
  fieldRows,
  history,
  fetchUserApis
}) {
  const [isPublicState, setIsPublicState] = useState(true);

  const [apiName, setApiName] = useState({
    value: "",
    error: ""
  });

  const [description, setDescription] = useState({
    value: "",
    error: ""
  });

  const handleIsPublicChange = event => {
    setIsPublicState(event.target.value);
  };

  function handleApiNameChange(event) {
    setApiName({
      ...apiName,
      value: event.target.value
    });
  }

  function handleApiNameValidation(event) {
    let error = "";
    if (event.target.value === "") {
      error = "*required";
    }
    setApiName({
      value: event.target.value,
      error
    });
  }

  function handleDescriptionChange(event) {
    setDescription({
      ...description,
      value: event.target.value
    });
  }

  return (
    <div className="box">
      <div className="bread-crumb">
        <BreadCrumb />
        <div className="flex">
          <Link to="/">
            <Button color="secondary" variant="contained" size="small">
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div className="box2">
<<<<<<< HEAD

      <form onSubmit= { async (e) => {
          const data = await handleApiSubmit( e, fieldRows, apiName,isPublicState, history, description);
          submitApiAction();
          history.push(`/apiDetails/${data.api_name}`);
        }}>

        <div className="">Create your own RESTful API</div>
        <div className="CreateApiForm-title">API</div>
        <div className="flex align-center">
          <TextField 
            error={apiName.error ? true : false}
            label="Api Name"
            name="Api Name"
            onBlur={handleApiNameValidation}
            onChange={handleApiNameChange}
            required
            size="small"
            value={apiName.value}
            variant="outlined" 
          />
=======
        <form
          onSubmit={e =>
            handleApiSubmit(
              e,
              fieldRows,
              apiName,
              submitApiAction,
              isPublicState,
              history,
              description
            )
          }
        >
          <div className="">Create your own RESTful API</div>
          <div className="CreateApiForm-title">API</div>
>>>>>>> Basic logic for ApiEdit-fields
          <div className="flex align-center">
            <TextField
              variant="outlined"
              size="small"
              onChange={handleApiNameChange}
              onBlur={handleApiNameValidation}
              name="Api Name"
              label="Api Name"
              value={apiName.value}
              error={apiName.error ? true : false}
              required
            />
            <div className="flex align-center">
              <div
                className="title2"
                style={{ marginRight: "20px", marginLeft: "40px" }}
              >
                Your endpoint:{" "}
              </div>
              <div>https://no-rest-api.herokuapp.com/api/{apiName.value}</div>
            </div>
          </div>
          <div className="errorText">{apiName.error}</div>

          <div className="flex align-center">
            <TextField
              variant="outlined"
              size="small"
              onChange={handleDescriptionChange}
              name="Description"
              label="Description"
              value={description.value}
              multiline={true}
              style={{ width: "700px" }}
            />
          </div>

          <div className="CreateApiForm-title" style={{ marginTop: "30px" }}>
            Privacy
          </div>
          <div className="flex">
            <IsPublicSelect
              value={isPublicState}
              handleChange={handleIsPublicChange}
            ></IsPublicSelect>
            <div className="flex-column">
              <div className="flex align-center">
                <div
                  className="title2"
                  style={{ marginRight: "20px", marginLeft: "40px" }}
                >
                  Public:
                </div>
                <div>Everyone can do a get request to your Api</div>
              </div>
              <div className="flex align-center">
                <div
                  className="title2"
                  style={{ marginRight: "20px", marginLeft: "40px" }}
                >
                  Private:
                </div>
                <div>Only You or who you decide can access de API</div>
              </div>
            </div>
          </div>

          <div className="CreateApiForm-title">Describe your collection</div>
          <div className="flex-column">
            {_.map(fieldRows.rows, (row, rowKey) => {
              return (
                <FieldRow
                  handleChange={handleRowChange}
                  deleteRow={deleteRow}
                  rowId={rowKey}
                  key={rowKey}
                  fieldRows={fieldRows}
                  touched={row.touched}
                />
              );
            })}
          </div>

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => addFormRow(fieldRows)}
          >
            Add Row
          </Button>

          <div className="flex justify-center" style={{ paddingTop: "50px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                maxWidth: "300px",
                maxHeight: "40px",
                minWidth: "300px",
                minHeight: "40px"
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps({ fieldRows }) {
  return { fieldRows };
}

// const mapDispatchToProps = dispatch => ({
//   fetchUserApis: () => dispatch(fetchUserApisAction())
// });

export default connect(mapStateToProps, actions)(withRouter(CreateApiForm));
