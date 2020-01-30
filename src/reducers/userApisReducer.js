import { FETCH_USER_APIS } from '../actions/types';

export default function(state = {userApis:[]}, action) {
  switch (action.type) {
    case FETCH_USER_APIS:
      return { ...state, userApis: action.payload };
    default:
      return state;
  }
}