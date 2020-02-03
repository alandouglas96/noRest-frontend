import { FETCH_PUBLIC_APIS } from '../actions/types';

export default function(state = {publicApis:[]}, action) {
  switch (action.type) {
    case FETCH_PUBLIC_APIS:
      return [ ...action.payload ];
    default:
      return state;
  }
}


