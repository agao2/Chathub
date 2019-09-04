import {combineReducers} from 'redux'
import User from './UsersReducers'
import Chatrooms from './ChatroomReducer'
export default combineReducers({
    User,
    Chatrooms
})