
import { actions } from '../actions/ChatroomActions'

const Chatrooms = (state = {}, action) => {
    switch (action.type) {
        case actions.CREATE_CHATROOM:
            //todo , add api call to create chatroom and add it to list
            return state;

        case actions.GET_CHATROOMS:
            return Object.assign({}, state, action.chatrooms);

        case actions.REQUEST_FAILED:
            return null;

        default:
            return state;
    }
}

export default Chatrooms