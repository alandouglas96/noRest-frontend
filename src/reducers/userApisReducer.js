import { FETCH_USER_APIS } from '../actions/types';
import { FETCH_SINGLE_API } from '../actions/types';

export default function(state = {userApis:[]}, action) {
  // console.log('REDUCER', action.payload)
  switch (action.type) {

    case FETCH_USER_APIS:
      return { ...state, userApis: action.payload };
    case FETCH_SINGLE_API:
      return { ...state, singleApi: action.payload };
    default:
      return state;
  }
}


