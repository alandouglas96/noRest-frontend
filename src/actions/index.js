//CREATE SERVICE FOR FETCH (modularize)

import jwt from 'jsonwebtoken';

export const FETCH_USER = 'fetch_user';
export const FETCH_USER_APIS = 'fetch_user_apis';
export const FETCH_SINGLE_API = 'fetch_single_api';

export const fetchUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  dispatch({ type: FETCH_USER, payload: token});
};


export const fetchUserApisAction = () => async dispatch =>{
  const token = localStorage.token;

  if (token) { // test if logged in
    const { id } = jwt.decode(token); // userId
    const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/user/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    };
    fetch(url, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 204 ) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    .then(res => res.json())
    .then(data => dispatch({ type: FETCH_USER_APIS, payload: data}))
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error fetching user APIs:', error);
    });
  }
}

export const resetUserApis = () => dispatch => {
  dispatch({type: FETCH_USER_APIS, payload: []});
}

export const submitApi = (values, history) => async dispatch => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api`;
  const token = localStorage.token;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  };

  fetch(url, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    .then(res => res.json())
    .then(data => history.push(`/apiDetails/${data.api_name}`))
    .then(data => (dispatch(fetchUserApisAction()), data))
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in submitting create API:', error);
    });
}

export const deleteApiData = (apiName, history) => async dispatch => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/data/api/${apiName}`;
  const token = localStorage.token;
  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    // .then(res => res.json())
    .then(() => history.push(`/apiDetails/${apiName}`))
    .then(() => (dispatch(fetchUserApisAction())))
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in deleting API data:', error);
    });
}

export const deleteApi = (apiName, history) => async dispatch => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/${apiName}`;
  const token = localStorage.token;
  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    // .then(res => res.json())
    .then(() => history.push('/userDashboard'))
    .then(() => dispatch(fetchUserApisAction()))  // HISTORY BEFORE??
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in deleting API data:', error);
    });
}








export const generateNewKeys = (apiName, history) => async dispatch => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/${apiName}/keys`;
  const token = localStorage.token;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  };

  fetch(url, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    .then(res => res.json())
    .then(data => console.log('KEYS   ', data))
    // .then(() => history.push(`/apiDetails/${apiName}`))
    .then(() => (dispatch(fetchUserApisAction())))  // HISTORY BEFORE??
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in generating API keys:', error);
    });
}







export const fetchSingleApiAction = (apiName) => async dispatch =>{
  const token = localStorage.token;

  const url = `${process.env.REACT_APP_BACKEND_URL}/logistics/api/${apiName}`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    }
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => dispatch({ type: FETCH_SINGLE_API, payload: data}))
    .catch(error => console.error(error));
}


export const handleRowChange = (event, inputName, rowId) => dispatch => {
  let error='';
  if ((inputName==='value') && (event.target.value==='')) error = ('*required');
  dispatch({type: 'SET_ROW', payload: {value: event.target.value, inputName, rowId, error}});
}

export const addFormRow = () => dispatch => {
  dispatch({type: 'SET_NEW_ROW'});
  //(numberOfFields => numberOfFields + 1)
  }

  export const deleteRow = (e, rowId) => dispatch => {
    dispatch({type: 'DELETE_ROW', payload: rowId});
  }

  export const setRow = () => dispatch => {
    dispatch({type: 'SET_ROW'});
  }


