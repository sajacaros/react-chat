import {SET_USER, CLEAR_USER} from '../actions/types';
import produce from 'immer';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

const user = produce((draft, action) => {
  switch(action.type) {
    case SET_USER:
      draft["currentUser"] = action.payload;
      draft["isLoading"] = false;
      break;
    case CLEAR_USER:
      draft["currentUser"] = null;
      draft["isLoading"] = false;
      break;
    default:
      break;
  }
}, initialUserState);
// const user = function(state = initialUserState, actions) {
//   switch(actions.type) {
//     case SET_USER:
//       return {
//         ...state,
//         currentUser: actions.payload,
//         isLoading: false,
//       };
//     case CLEAR_USER:
//       return {
//         ...state,
//         currentUser: null,
//         isLoading: false,
//       };
//     default:
//       return state;
//   }
// }

export default user;