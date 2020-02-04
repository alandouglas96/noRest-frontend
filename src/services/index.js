export const getApiData = async (apiName) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/${apiName}`;
  const token = localStorage.token;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
  };
  
  const data = await fetch(url, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        response.json().then(result => window.alert(result.error));
        throw new Error('bypass');
      } else return response;
    })
    .catch(error => {
      if (error.message !== 'bypass') console.error('Error in Api Postman:', error);
    });

    return data.json(); 
}

export const submitApi = (values) => {
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
      .then(data => data)
      .catch(error => {
        if (error.message !== 'bypass') console.error('Error in submitting create API:', error);
      });
}

export const postNewRow = (values, apiInfo) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/${apiInfo.apiName}`;
  console.log(url)
    const token = localStorage.token;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`,
        'Api_Key': apiInfo.apiKey,
        'Api_Secret_Key': apiInfo.apiSecretKey
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
      .then(data => data)
      .catch(error => {
        if (error.message !== 'bypass') console.error('Error in submitting new row', error);
      });
}

export const searchRows = async (apiName, seachString) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/${apiName}`;
    const token = localStorage.token;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
    };
    
    const data = await fetch(url, options)
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          response.json().then(result => window.alert(result.error));
          throw new Error('bypass');
        } else return response;
      })
      .catch(error => {
        if (error.message !== 'bypass') console.error('Error in Search Rows:', error);
      });

    return data.json();
}


