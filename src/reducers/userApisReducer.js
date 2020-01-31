import { FETCH_USER_APIS } from '../actions/types';

export default function(state = {userApis:[]}, action) {
  console.log('REDUCER', action.payload)
  switch (action.type) {
    
    case FETCH_USER_APIS:
      return { ...state, userApis: action.payload };
    default:
      return state;
  }
}