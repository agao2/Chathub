import {combineReducers} from 'redux'
import HubConnections from './HubConnectionsReducers'
import User from './UsersReducers'

export default combineReducers({
    HubConnections,
    User
})