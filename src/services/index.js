import { connect } from "react-redux";

export const getApiData = (props) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/${props.apiName}`;
  console.log('URL', url)
    const token = localStorage.token;
    
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
     // body: JSON.stringify(values)
    };
    //console.log('Values', JSON.stringify(values))
    if (props.apiName) {
      fetch(url, options)
        .then(response => {
          if (response.status !== 200 && response.status !== 201) {
            response.json().then(result => window.alert(result.error));
            throw new Error('bypass');
          } else return response;
        })
        .then(res => res.json())
        //.then(data => history.push(`/apiDetails/${data.api_name}`))
        //.then(data => (dispatch(fetchUserApisAction()), data))
        .then(data => console.log('done', data))
        .catch(error => {
          if (error.message !== 'bypass') console.error('Error in Api Postman:', error);
        });
    }

}

export const submitApi = (values, history, submitApiAction) => {
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
  
    console.log('Values', JSON.stringify(values))
  
   return fetch(url, options)
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          response.json().then(result => window.alert(result.error));
          throw new Error('bypass');
        } else return response;
      })
      .then(res => res.json())
      //.then(data => history.push(`/apiDetails/${data.api_name}`))
      //.then(data => (submitApiAction(), data))
      .then(data => data)
      
      //.then(data => console.log('done', data))
      .catch(error => {
        if (error.message !== 'bypass') console.error('Error in submitting create API:', error);
      });
}

// const mapDispatchToProps = dispatch => ({
//   fetchUserApis: () => dispatch(fetchUserApisAction())
// });

// connect(null, mapDispatchToProps)(createApi);




