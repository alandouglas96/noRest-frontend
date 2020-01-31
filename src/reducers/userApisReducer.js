import { FETCH_USER_APIS } from '../actions/types';
import { FETCH_SINGLE_API } from '../actions/types';

export default function(state = {userApis:[]}, action) {
<<<<<<< HEAD
  // console.log('REDUCER', action.payload)
  switch (action.type) {

=======
  switch (action.type) {
>>>>>>> Feat: some styling in general, unified css, style on user dashboard, api details, implementing bread scrumbs
    case FETCH_USER_APIS:
      return { ...state, userApis: action.payload };
    case FETCH_SINGLE_API:
      return { ...state, singleApi: action.payload };
    default:
      return state;
  }
}


