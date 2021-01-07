import {SET_USER, CLEAR_USER, SET_PHOTO_URL} from '../actions/types';
// import produce from 'immer';

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

// const user = produce((draft, action) => {
//   switch(action.type) {
//     case SET_USER:
//       draft.currentUser = action.payload;
//       draft.isLoading = false;
//       break;
//     case CLEAR_USER:
//       draft.currentUser = null;
//       draft.isLoading = false;
//       break;
//     case SET_PHOTO_URL:
//       console.log('current : ', draft.currentUser);
//       draft.currentUser.photoURL = action.payload;
//       // draft['currentUser.photoURL'] = action.payload;
//       break;
//     default:
//       break;
//   }
// }, initialUserState);
const user = function(state = initialUserState, actions) {
  switch(actions.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: actions.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: {...state.currentUser, photoURL:actions.payload},
        isLoading: false,
      };
    default:
      return state;
  }
}

export default user;