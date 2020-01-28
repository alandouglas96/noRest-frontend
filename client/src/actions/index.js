export const FETCH_USER = 'fetch_user';

export const fetchUser = () => async dispatch => {
 const token = localStorage.getItem('token');
 // const res = await axios.get('/api/current_user')
 console.log('LocalStorage', token)
  dispatch({ type: FETCH_USER, payload: token});
};

export const submitApi = (values) => async dispatch => {

  const url = 'http://localhost:3000/logistics/api';
  const token = localStorage.token
  console.log('TOKEN------->',token)
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
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => {
      console.log('Error on Post Request');
      console.error(e);
    });
}

