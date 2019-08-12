import {combineReducers} from 'redux'
import HubConnections from './HubConnectionsReducers'
import User from './UsersReducers'
import Chatrooms from './ChatroomReducer'
export default combineReducers({
    HubConnections,
    User,
    Chatrooms
})