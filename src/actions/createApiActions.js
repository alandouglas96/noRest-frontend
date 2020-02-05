import { fetchUserApisAction } from "../actions/index";

export const handleRowChange = (event, inputName, rowId) => dispatch => {
  let error = "";
  if (inputName === "value" && event.target.value === "") {
    error = "*required";
  }
  dispatch({
    type: "SET_ROW",
    payload: { value: event.target.value, inputName, rowId, error }
  });
};

export const addFormRow = () => dispatch => {
  dispatch({ type: "SET_NEW_ROW" });
};

export const deleteRow = (e, rowId) => dispatch => {
  dispatch({ type: "DELETE_ROW", payload: rowId });
};

export const setRow = () => dispatch => {
  dispatch({ type: "SET_ROW" });
};

export const submitApiAction = () => async dispatch => {
  dispatch(fetchUserApisAction());
};


