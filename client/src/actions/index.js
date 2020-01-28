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
      return fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: values
      })
        .then(resp => resp.json())
        .then(test => console.log('TESTTTT   : ', test))
        .then(data => {
          if (data.message) {
            console.log('ERRROR');
            localStorage.removeItem("token")
          } else {
            console.log('DONE');

          }
        })
      }