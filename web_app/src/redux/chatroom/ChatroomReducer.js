
import { actions } from './ChatroomActions'
const defaultState = {
    data: [],
    loading: false
}

const Chatrooms = (state = defaultState, action) => {
    switch (action.type) {
        case actions.CREATE_CHATROOM:
            //todo , add api call to create chatroom and add it to list
            return state;

        case actions.GET_CHATROOMS:
            return { ...state, loading: true };

        case actions.REQUEST_SUCESS:
            return { ...state, loading: false, data: action.chatrooms }

        case actions.REQUEST_FAILED:
            return null;

        default:
            return defaultState;
    }
}

export default Chatrooms