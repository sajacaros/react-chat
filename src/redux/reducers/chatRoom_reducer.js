import {SET_CURRENT_CHAT_ROOM} from '../actions/types';

const initialChatRoomState = {
  currentChatRoom: null
};

const chatRoom = function(state = initialChatRoomState, actions) {
  switch(actions.type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: actions.payload,
      };
    default:
      return state;
  }
}

export default chatRoom;