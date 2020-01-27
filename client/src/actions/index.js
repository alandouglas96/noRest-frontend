export const FETCH_USER = 'fetch_user';

export const fetchUser = () => async dispatch => {
 // const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: ' '});
};