import {combineReducers} from 'redux'
import User from './user/UsersReducers'
import Chatrooms from './chatroom/ChatroomReducer'
export default combineReducers({
    User,
    Chatrooms
})